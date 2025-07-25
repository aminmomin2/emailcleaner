import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth';
import { UserService } from '../../lib/services/userService';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const hasSynced = await UserService.getUserSyncState(session.user.id);
  return NextResponse.json({ hasSynced });
} 