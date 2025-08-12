import { executeQuery, executeSingleQuery } from './database';
import { classifyEmailWithGemini } from './utils/geminiClient';
import { getAuthenticatedGoogleClient } from './auth/tokenManagement';
import { google, gmail_v1 } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

interface CleanupSuggestion {
  emailId: string;
  providerEmailId: string;
  from: string;
  subject: string;
  snippet: string;
  reason: string;
  suggestedAction: 'archive' | 'trash' | 'delete_permanently';
}

interface UserEmail {
  id: string;
  providerEmailId: string;
  fromEmail?: string;
  subject?: string;
  snippet?: string;
  status?: string;
  internalDate?: string | number | Date;
}

interface UserPreference {
  preference_key: string;
  preference_value: string;
}

// Store suggestion in database
async function storeSuggestion(userId: string, suggestion: CleanupSuggestion) {
  const query = `
    INSERT INTO cleanup_suggestions (
      id, user_id, email_id, provider_email_id, from_email, subject, snippet, reason, suggested_action
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      from_email = VALUES(from_email),
      subject = VALUES(subject),
      snippet = VALUES(snippet),
      reason = VALUES(reason),
      suggested_action = VALUES(suggested_action),
      updated_at = CURRENT_TIMESTAMP
  `;
  
  // Ensure all parameters are not undefined - convert undefined to null for database
  await executeSingleQuery(query, [
    crypto.randomUUID(),
    userId,
    suggestion.emailId || null,
    suggestion.providerEmailId || null,
    suggestion.from || null,
    suggestion.subject || null,
    suggestion.snippet || null,
    suggestion.reason || null,
    suggestion.suggestedAction || null,
  ]);
}

export async function analyzeEmailsForCleanup(userId: string): Promise<CleanupSuggestion[]> {
  const suggestions: CleanupSuggestion[] = [];

  // 1. Fetch recent emails from your DB (last 30 days, status active)
  // Also check if we already have suggestions for these emails to avoid reprocessing
  const recentEmails = await executeQuery<UserEmail>(
    `SELECT ue.id, ue.provider_email_id as providerEmailId, ue.from_email as fromEmail, ue.subject, ue.snippet, ue.status, ue.internal_date as internalDate FROM user_emails ue 
     LEFT JOIN cleanup_suggestions cs ON ue.id = cs.email_id AND cs.status = 'pending'
     WHERE ue.user_id = ? AND ue.status = 'active' 
     AND ue.internal_date >= ? 
     AND cs.id IS NULL
     ORDER BY ue.internal_date DESC LIMIT 10`,
    [userId, new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)]
  );

  // 2. Fetch user preferences
  const userPreferences = await executeQuery<UserPreference>(
    `SELECT * FROM user_preferences WHERE user_id = ? AND preference_key IN (?, ?)`,
    [userId, 'email_unwanted_senders', 'email_auto_clean_age_days']
  );
  const unwantedSendersPref = userPreferences.find((p) => p.preference_key === 'email_unwanted_senders')?.preference_value;
  const autoCleanAgeDaysPref = userPreferences.find((p) => p.preference_key === 'email_auto_clean_age_days')?.preference_value;

  const unwantedSenders = unwantedSendersPref ? JSON.parse(unwantedSendersPref) : [];
  const autoCleanAgeDays = autoCleanAgeDaysPref ? parseInt(autoCleanAgeDaysPref) : null;

  // Prepare Gmail API client
  let gmail: gmail_v1.Gmail | null = null;
  let authClient: OAuth2Client | null = null;
  try {
    authClient = await getAuthenticatedGoogleClient(userId);
    gmail = google.gmail({ version: 'v1', auth: authClient });
  } catch (err) {
    console.error('Failed to initialize Gmail API client:', err);
  }


  
  for (const email of recentEmails) {
    // Skip emails that don't have a provider_email_id (required for cleanup suggestions)
    if (!email.providerEmailId) {
      continue;
    }
    
    // --- Apply Explicit User Rules (Highest Priority) ---
    if (unwantedSenders.some((sender: string) => email.fromEmail?.includes(sender))) {
      const suggestion = {
        emailId: email.id,
        providerEmailId: email.providerEmailId,
        from: email.fromEmail || 'Unknown',
        subject: email.subject || 'No Subject',
        snippet: email.snippet || '',
        reason: `User Rule: Unwanted Sender (${email.fromEmail})`,
        suggestedAction: 'trash' as const,
      };
      suggestions.push(suggestion);
      await storeSuggestion(userId, suggestion);
      continue;
    }
    if (autoCleanAgeDays && email.internalDate && (Date.now() - new Date(email.internalDate as string).getTime()) / (1000 * 60 * 60 * 24) > autoCleanAgeDays) {
      const suggestion = {
        emailId: email.id,
        providerEmailId: email.providerEmailId,
        from: email.fromEmail || 'Unknown',
        subject: email.subject || 'No Subject',
        snippet: email.snippet || '',
        reason: `User Rule: Older than ${autoCleanAgeDays} days`,
        suggestedAction: 'archive' as const,
      };
      suggestions.push(suggestion);
      await storeSuggestion(userId, suggestion);
      continue;
    }
    // --- AI Classification (for emails not covered by explicit rules) ---
    try {
      // Use snippet for classification to avoid extra Gmail API calls
      // Only fetch full body if snippet is too short for classification
      let emailContent = email.snippet || '';
      
      // Only fetch full email body if snippet is very short (less than 50 chars)
      if (gmail && email.providerEmailId && (email.snippet || '').length < 50) {
        try {
          const fullEmailRes = await gmail.users.messages.get({
            userId: 'me',
            id: email.providerEmailId,
            format: 'full',
          });
          const message: gmail_v1.Schema$Message = fullEmailRes.data;
          emailContent = message.payload?.parts
            ?.map((part) => part.body?.data ? Buffer.from(part.body.data as string, 'base64').toString('utf8') : '')
            .join(' ') || message.snippet || '';
        } catch (gmailErr) {
          console.error('Failed to fetch full email body from Gmail:', gmailErr);
        }
      }
      
      const classificationText = await classifyEmailWithGemini(email.subject || '', email.fromEmail || '', email.snippet || '', emailContent);
      if ([
        'Newsletter',
        'Promotional',
        'Social Notification',
        'Spam',
      ].includes(classificationText)) {
              // Validate required fields before creating suggestion
      if (!email.id || !email.providerEmailId) {
        continue;
      }
      
      const suggestion = {
        emailId: email.id,
        providerEmailId: email.providerEmailId,
        from: email.fromEmail || 'Unknown',
        subject: email.subject || 'No Subject',
        snippet: email.snippet || '',
        reason: `AI Classified: ${classificationText}`,
        suggestedAction: 'archive' as const,
      };
      suggestions.push(suggestion);
      await storeSuggestion(userId, suggestion);
      }
      
      // Removed delay for faster processing
    } catch (llmError) {
      console.error(`LLM classification failed for email ${email.id}:`, llmError);
    }
  }

  return suggestions;
} 