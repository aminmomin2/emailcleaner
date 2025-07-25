import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { archiveEmail, trashEmail, deletePermanently } from '../../lib/integrations/google/gmailActions';
import { executeQuery } from '../../lib/database';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const body = await req.json();
  const { emailId, action } = body;
  if (!emailId || !action) {
    return NextResponse.json({ message: 'Missing emailId or action' }, { status: 400 });
  }
  // Fetch providerEmailId from DB
  const userEmail = await executeQuery<{ providerEmailId: string }>(
    'SELECT providerEmailId FROM user_emails WHERE id = ? AND user_id = ? LIMIT 1',
    [emailId, session.user.id]
  );
  if (!userEmail || userEmail.length === 0) {
    return NextResponse.json({ message: 'Email not found or unauthorized' }, { status: 404 });
  }
  let success = false;
  try {
    switch (action) {
      case 'archive':
        success = await archiveEmail(session.user.id, userEmail[0].providerEmailId);
        break;
      case 'trash':
        success = await trashEmail(session.user.id, userEmail[0].providerEmailId);
        break;
      case 'delete_permanently':
        success = await deletePermanently(session.user.id, userEmail[0].providerEmailId);
        break;
      default:
        return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
    }
    if (success) {
      // Update status in user_emails
      const newStatus = action === 'archive' ? 'archived' : action === 'trash' ? 'trashed' : 'deleted';
      await executeQuery(
        'UPDATE user_emails SET status = ? WHERE id = ?',
        [newStatus, emailId]
      );
      
      // Update suggestion status to executed
      await executeQuery(
        'UPDATE cleanup_suggestions SET status = ? WHERE user_id = ? AND email_id = ?',
        ['executed', session.user.id, emailId]
      );
      
      return NextResponse.json({ message: `Email ${action}d successfully.`, success: true }, { status: 200 });
    } else {
      return NextResponse.json({ message: `Failed to ${action} email.`, success: false }, { status: 500 });
    }
  } catch (error) {
    console.error(`Error executing cleanup action '${action}' for email ${emailId}:`, error);
    return NextResponse.json({ message: 'Failed to execute cleanup action.', error: (error as Error).message }, { status: 500 });
  }
} 