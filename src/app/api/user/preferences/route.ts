import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { executeQuery, executeSingleQuery } from '../../lib/database';
import { v4 as uuidv4 } from 'uuid';

// GET: fetch all preferences for the user
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  try {
    const prefs = await executeQuery(
      'SELECT preference_key, preference_value FROM user_preferences WHERE user_id = ?',
      [session.user.id]
    );
    return NextResponse.json({ preferences: prefs }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch preferences', error: (error as Error).message }, { status: 500 });
  }
}

// POST: upsert a preference (expects { key, value })
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { key, value } = await req.json();
    if (!key || value === undefined) {
      return NextResponse.json({ message: 'Missing key or value' }, { status: 400 });
    }
    // Upsert preference with UUID for id
    await executeSingleQuery(
      `INSERT INTO user_preferences (id, user_id, preference_key, preference_value)
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE preference_value = VALUES(preference_value)`,
      [uuidv4(), session.user.id, key, value]
    );
    return NextResponse.json({ message: 'Preference updated', key, value }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to update preference', error: (error as Error).message }, { status: 500 });
  }
} 