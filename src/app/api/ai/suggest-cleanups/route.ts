/**
 * AI Cleanup Suggestions API Route
 * 
 * This endpoint retrieves AI-generated cleanup suggestions for a user's emails.
 * It fetches pending suggestions from the database and validates that the user
 * has a valid Google account connection before returning the data.
 * 
 * Security:
 * - Requires authenticated user session
 * - Validates Google account connection
 * - Returns only user's own suggestions
 * 
 * @route GET /api/ai/suggest-cleanups
 * @author Amin Momin
 * @version 1.0.0
 */

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { executeQuery } from '../../lib/database';

/**
 * Database interface for stored cleanup suggestions
 * 
 * Represents the structure of cleanup suggestions as stored in the database,
 * including metadata like creation time, status, and user association.
 */
interface StoredCleanupSuggestion {
  id: string;
  user_id: string;
  email_id: string;
  provider_email_id: string;
  from_email: string;
  subject: string;
  snippet: string;
  reason: string;
  suggested_action: 'archive' | 'trash' | 'delete_permanently';
  status: 'pending' | 'approved' | 'rejected' | 'executed';
  created_at: string;
  updated_at: string;
}

/**
 * GET handler for cleanup suggestions
 * 
 * Retrieves AI-generated cleanup suggestions for the authenticated user.
 * Validates Google account connection and returns pending suggestions.
 * 
 * @returns {Promise<NextResponse>} JSON response with cleanup suggestions
 */
export async function GET() {
  // Verify user authentication
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  
  // Validate Google account connection
  const { AccountService } = await import('../../lib/services/accountService');
  const accounts = await AccountService.getAccountsByUserId(session.user.id);
  const googleAccount = accounts.find(
    (acc) => acc.provider === 'google' && acc.refresh_token && acc.access_token
  );
  
  if (!googleAccount) {
    return NextResponse.json({ 
      message: 'No valid Google account found. Please reconnect your Gmail account.',
      requiresReauth: true
    }, { status: 401 });
  }
  
  try {
    
    // Fetch pending suggestions from database
    const storedSuggestions = await executeQuery<StoredCleanupSuggestion>(
      `SELECT * FROM cleanup_suggestions 
       WHERE user_id = ? AND status = 'pending' 
       ORDER BY created_at DESC`,
      [session.user.id]
    );
    
    // Transform to match the expected format
    const suggestions = storedSuggestions.map(s => ({
      emailId: s.email_id,
      providerEmailId: s.provider_email_id,
      from: s.from_email,
      subject: s.subject,
      snippet: s.snippet,
      reason: s.reason,
      suggestedAction: s.suggested_action,
    }));
    

    return NextResponse.json({ suggestions }, { status: 200 });
  } catch (error) {
    console.error('[ERROR] Error fetching cleanup suggestions:', error);
    if (error instanceof Error) {
      console.error('[ERROR] Stack:', error.stack);
    }
    return NextResponse.json({ message: 'Failed to fetch cleanup suggestions', error: (error as Error).message, stack: (error as Error).stack }, { status: 500 });
  }
} 