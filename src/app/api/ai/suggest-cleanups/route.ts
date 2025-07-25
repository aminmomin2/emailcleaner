import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { executeQuery } from '../../lib/database';

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

export async function GET() {
  console.log('[DEBUG] /api/ai/suggest-cleanups called');
  const session = await getServerSession(authOptions);
  console.log('[DEBUG] Session:', session);
  if (!session || !session.user?.id) {
    console.log('[DEBUG] Unauthorized: No session or user id');
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  try {
    console.log('[DEBUG] Fetching stored suggestions for user:', session.user.id);
    
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
    
    console.log('[DEBUG] Stored suggestions returned:', suggestions.length);
    return NextResponse.json({ suggestions }, { status: 200 });
  } catch (error) {
    console.error('[ERROR] Error fetching cleanup suggestions:', error);
    if (error instanceof Error) {
      console.error('[ERROR] Stack:', error.stack);
    }
    return NextResponse.json({ message: 'Failed to fetch cleanup suggestions', error: (error as Error).message, stack: (error as Error).stack }, { status: 500 });
  }
} 