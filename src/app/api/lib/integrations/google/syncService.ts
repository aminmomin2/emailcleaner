import { getAuthenticatedGoogleClient } from '../../auth/tokenManagement';
import { google } from 'googleapis';
import { executeSingleQuery } from '../../database';
import crypto from 'crypto';
import { toMySQLDateTime } from '../../utils/datetime';
import type { gmail_v1, calendar_v3 } from 'googleapis';

/**
 * One-time sync of recent Gmail and Calendar data for a user.
 * - Fetches recent emails and calendar events
 * - Stores them in user_emails and user_calendar_events tables
 */
export async function syncInitialUserData(userId: string) {
  try {
    const oauth2Client = await getAuthenticatedGoogleClient(userId);
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    // --- Fetch Recent Emails (last 30 days) ---
    const afterDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const afterStr = `${afterDate.getFullYear()}/${afterDate.getMonth() + 1}/${afterDate.getDate()}`;
    const messagesList = await gmail.users.messages.list({
      userId: 'me',
      q: `after:${afterStr}`,
      maxResults: 20, // limit for initial sync
    });
    const messages = messagesList.data.messages || [];
    for (const msg of messages) {
      try {
        const msgDetail = await gmail.users.messages.get({ userId: 'me', id: msg.id! });
        const data = msgDetail.data;
        // Extract fields for user_emails table
        const emailId = crypto.randomUUID();
        const provider_email_id = msg.id!;
        const thread_id = data.threadId || null;
        let from_email = null;
        let to_emails = null;
        let cc_emails = null;
        let bcc_emails = null;
        let subject = null;
        let label_ids = null;
        if (data.payload && data.payload.headers) {
          const headers: gmail_v1.Schema$MessagePartHeader[] = data.payload.headers;
          const getHeader = (name: string) => headers.find((h) => h.name?.toLowerCase() === name.toLowerCase())?.value || null;
          from_email = getHeader('From');
          const toHeader = getHeader('To');
          to_emails = toHeader ? JSON.stringify(toHeader.split(',')) : null;
          const ccHeader = getHeader('Cc');
          cc_emails = ccHeader ? JSON.stringify(ccHeader.split(',')) : null;
          const bccHeader = getHeader('Bcc');
          bcc_emails = bccHeader ? JSON.stringify(bccHeader.split(',')) : null;
          subject = getHeader('Subject');
        }
        label_ids = data.labelIds ? JSON.stringify(data.labelIds) : null;
        const snippet = data.snippet || null;
        const internal_date = data.internalDate ? toMySQLDateTime(new Date(Number(data.internalDate))) : null;
        const is_read = data.labelIds ? !data.labelIds.includes('UNREAD') : false;
        const status = 'active';
        const raw_body_hash = null; // Not extracting full body here
        // Insert into user_emails table
        const emailQuery = `
          INSERT INTO user_emails (
            id, user_id, provider_email_id, thread_id, from_email, to_emails, cc_emails, bcc_emails, subject, snippet, internal_date, is_read, label_ids, status, raw_body_hash
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE
            snippet=VALUES(snippet),
            internal_date=VALUES(internal_date),
            is_read=VALUES(is_read),
            label_ids=VALUES(label_ids),
            status=VALUES(status)
        `;
        await executeSingleQuery(emailQuery, [
          emailId,
          userId,
          provider_email_id,
          thread_id,
          from_email,
          to_emails,
          cc_emails,
          bcc_emails,
          subject,
          snippet,
          internal_date,
          is_read,
          label_ids,
          status,
          raw_body_hash,
        ]);
      } catch (err) {
        console.error('Failed to fetch/store email:', err);
      }
    }

    // --- Fetch Recent Calendar Events (last 30 days) ---
    const timeMin = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const timeMax = new Date().toISOString();
    const eventsList = await calendar.events.list({
      calendarId: 'primary',
      timeMin,
      timeMax,
      maxResults: 20, // limit for initial sync
      singleEvents: true,
      orderBy: 'startTime',
    });
    const events = eventsList.data.items || [];
    for (const event of events) {
      try {
        const eventId = crypto.randomUUID();
        const provider_event_id = event.id!;
        const calendar_id = event.organizer?.email || 'primary';
        const summary = event.summary || null;
        const description = event.description || null;
        const start_time = event.start?.dateTime ? toMySQLDateTime(event.start.dateTime) : (event.start?.date ? toMySQLDateTime(event.start.date) : null);
        const end_time = event.end?.dateTime ? toMySQLDateTime(event.end.dateTime) : (event.end?.date ? toMySQLDateTime(event.end.date) : null);
        const location = event.location || null;
        const attendees = event.attendees ? JSON.stringify((event.attendees as calendar_v3.Schema$EventAttendee[]).map((a) => ({ email: a.email, responseStatus: a.responseStatus }))) : null;
        const status = event.status === 'cancelled' ? 'cancelled' : (event.status === 'tentative' ? 'tentative' : 'confirmed');
        const html_link = event.htmlLink || null;
        // Insert into user_calendar_events table
        const eventQuery = `
          INSERT INTO user_calendar_events (
            id, user_id, provider_event_id, calendar_id, summary, description, start_time, end_time, location, attendees, status, html_link
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE
            summary=VALUES(summary),
            description=VALUES(description),
            start_time=VALUES(start_time),
            end_time=VALUES(end_time),
            location=VALUES(location),
            attendees=VALUES(attendees),
            status=VALUES(status),
            html_link=VALUES(html_link)
        `;
        await executeSingleQuery(eventQuery, [
          eventId,
          userId,
          provider_event_id,
          calendar_id,
          summary,
          description,
          start_time,
          end_time,
          location,
          attendees,
          status,
          html_link,
        ]);
      } catch (err) {
        console.error('Failed to store calendar event:', err);
      }
    }

    console.log(`Initial sync complete for user ${userId}: ${messages.length} emails, ${events.length} events.`);
  } catch (err) {
    console.error('Initial Google sync failed:', err);
    // Optionally: throw or handle error
  }
} 