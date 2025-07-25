import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { analyzeEmailsForCleanup } from '../../lib/emailCleanerService';

export async function POST() {
  console.log('[DEBUG] /api/ai/generate-cleanups called');
  const session = await getServerSession(authOptions);
  console.log('[DEBUG] Session:', session);
  if (!session || !session.user?.id) {
    console.log('[DEBUG] Unauthorized: No session or user id');
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  try {
    console.log('[DEBUG] Generating new cleanup suggestions for user:', session.user.id);
    const suggestions = await analyzeEmailsForCleanup(session.user.id);
    console.log('[DEBUG] Generated suggestions:', suggestions.length);
    return NextResponse.json({ 
      message: `Generated ${suggestions.length} new suggestions`,
      count: suggestions.length 
    }, { status: 200 });
  } catch (error) {
    console.error('[ERROR] Error generating cleanup suggestions:', error);
    if (error instanceof Error) {
      console.error('[ERROR] Stack:', error.stack);
    }
    return NextResponse.json({ message: 'Failed to generate cleanup suggestions', error: (error as Error).message, stack: (error as Error).stack }, { status: 500 });
  }
} 