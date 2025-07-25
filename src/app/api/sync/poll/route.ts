import { NextResponse } from 'next/server';
import { pollForNewData } from '../../lib/integrations/google/pollingService';

export async function POST() {
  try {
    await pollForNewData();
    return NextResponse.json({ status: 'success', message: 'Polling complete.' });
  } catch (err) {
    console.error('Polling error:', err);
    return NextResponse.json({ status: 'error', message: 'Polling failed.', error: String(err) }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic'; 