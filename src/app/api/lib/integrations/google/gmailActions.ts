import { google } from 'googleapis';
import { getAuthenticatedGoogleClient } from '../../auth/tokenManagement';

// Placeholder for logging actions (replace with your DB logic)
async function logAiAction(userId: string, actionType: string, status: string, details: Record<string, unknown>, workflowRunId?: string, sourceContext?: Record<string, unknown>) {
    // TODO: Replace with actual DB logging logic
    console.log('AI Action Log:', {
        id: crypto.randomUUID(),
        userId,
        actionType,
        status,
        details: details || {},
        workflowRunId,
        sourceContext: sourceContext || {},
    });
}

// Function to archive an email
export async function archiveEmail(userId: string, providerEmailId: string): Promise<boolean> {
    try {
        const authClient = await getAuthenticatedGoogleClient(userId);
        const gmail = google.gmail({ version: 'v1', auth: authClient });

        // Remove 'INBOX' label, which effectively archives it in Gmail
        await gmail.users.messages.modify({
            userId: 'me',
            id: providerEmailId,
            requestBody: {
                removeLabelIds: ['INBOX'],
            },
        });

        await logAiAction(userId, 'email_archived', 'success', { providerEmailId, action: 'archive' });
        return true;
    } catch (error) {
        console.error(`Error archiving email ${providerEmailId} for user ${userId}:`, error);
        await logAiAction(userId, 'email_archived', 'failed', { providerEmailId, action: 'archive', error: (error as Error).message });
        throw error;
    }
}

// Function to trash an email
export async function trashEmail(userId: string, providerEmailId: string): Promise<boolean> {
    try {
        const authClient = await getAuthenticatedGoogleClient(userId);
        const gmail = google.gmail({ version: 'v1', auth: authClient });

        await gmail.users.messages.trash({
            userId: 'me',
            id: providerEmailId,
        });

        await logAiAction(userId, 'email_trashed', 'success', { providerEmailId, action: 'trash' });
        return true;
    } catch (error) {
        console.error(`Error trashing email ${providerEmailId} for user ${userId}:`, error);
        await logAiAction(userId, 'email_trashed', 'failed', { providerEmailId, action: 'trash', error: (error as Error).message });
        throw error;
    }
}

// Function to permanently delete an email (use with extreme caution!)
export async function deletePermanently(userId: string, providerEmailId: string): Promise<boolean> {
    try {
        const authClient = await getAuthenticatedGoogleClient(userId);
        const gmail = google.gmail({ version: 'v1', auth: authClient });

        // This bypasses trash and permanently deletes.
        await gmail.users.messages.delete({
            userId: 'me',
            id: providerEmailId,
        });

        await logAiAction(userId, 'email_deleted_permanently', 'success', { providerEmailId, action: 'delete_permanently' });
        return true;
    } catch (error) {
        console.error(`Error permanently deleting email ${providerEmailId} for user ${userId}:`, error);
        await logAiAction(userId, 'email_deleted_permanently', 'failed', { providerEmailId, action: 'delete_permanently', error: (error as Error).message });
        throw error;
    }
} 