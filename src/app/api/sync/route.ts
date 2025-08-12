/**
 * Gmail Synchronization API Route
 * 
 * This endpoint handles the initial synchronization of a user's Gmail account.
 * It fetches recent emails and calendar events, storing them in the database
 * for AI analysis and cleanup suggestions.
 * 
 * Security:
 * - Requires authenticated user session
 * - Validates user permissions before sync
 * - Handles OAuth token refresh automatically
 * 
 * @route POST /api/sync
 * @author Amin Momin
 * @version 1.0.0
 */

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { syncInitialUserData } from '@/app/api/lib/integrations/google/syncService';

/**
 * POST handler for Gmail synchronization
 * 
 * Initiates the sync process for the authenticated user's Gmail account.
 * Fetches recent emails and calendar events, storing them in the database.
 * 
 * @returns {Promise<NextResponse>} JSON response indicating success or failure
 */
export async function POST() {
  try {
    // Verify user authentication
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Perform initial data synchronization
    await syncInitialUserData(session.user.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Sync error:', error);
    return NextResponse.json({ error: 'Sync failed', details: (error as Error).message }, { status: 500 });
  }
} 