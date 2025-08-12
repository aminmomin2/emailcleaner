import { UserEmailService, UserCalendarEventService, UserEmail, UserCalendarEvent } from './app/api/lib/services/userService';

function getUserFromContext(context: Record<string, unknown>): unknown {
  if ('user' in context && context.user) return context.user;
  const req = context.req as { headers?: Record<string, string> } | undefined;
  if (req?.headers && typeof req.headers['x-user-info'] === 'string') {
    try {
      return JSON.parse(req.headers['x-user-info']);
    } catch {
      return null;
    }
  }
  return null;
}

export const resolvers = {
  Query: {
    me: (_root: unknown, _args: unknown, context: Record<string, unknown>) => {
      return getUserFromContext(context);
    },
    userEmailsByUser: async (_root: unknown, { userId }: { userId: string }) => {
      const emails: UserEmail[] = await UserEmailService.getUserEmailsByUserId(userId);
      // Helper to recursively parse stringified arrays and return a flat array of clean strings
      const toFlatStringArray = (val: unknown): string[] => {
        if (!val) return [];
        if (Array.isArray(val)) {
          // Ensure all elements are strings and filter out empty/falsey
          return val.map(String).map(s => s.replace(/"/g, '').trim()).filter(Boolean);
        }
        if (typeof val === 'string') {
          try {
            const parsed = JSON.parse(val);
            if (Array.isArray(parsed)) {
              return parsed.map(String).map(s => s.replace(/"/g, '').trim()).filter(Boolean);
            }
            return [val.replace(/"/g, '').trim()];
          } catch {
            return [val.replace(/"/g, '').trim()];
          }
        }
        return [String(val).replace(/"/g, '').trim()];
      };
      const result = emails.map((email: UserEmail) => {
        const toEmailsParsed = toFlatStringArray(email.to_emails);
        const ccEmailsParsed = toFlatStringArray(email.cc_emails);
        const bccEmailsParsed = toFlatStringArray(email.bcc_emails);
        const labelIdsParsed = toFlatStringArray(email.label_ids);

        return {
          id: email.id,
          fromEmail: email.from_email,
          toEmails: toEmailsParsed,
          ccEmails: ccEmailsParsed,
          bccEmails: bccEmailsParsed,
          subject: email.subject,
          snippet: email.snippet,
          internalDate: email.internal_date,
          isRead: !!email.is_read,
          createdAt: email.created_at,
          labelIds: labelIdsParsed,
        };
      });
      return result;
    },
    userCalendarEventsByUser: async (_root: unknown, { userId }: { userId: string }) => {
      const events: UserCalendarEvent[] = await UserCalendarEventService.getUserCalendarEventsByUserId(userId);
      return events.map((event: UserCalendarEvent) => ({
        id: event.id,
        summary: event.summary,
        description: event.description,
        startTime: event.start_time,
        endTime: event.end_time,
        location: event.location,
        status: event.status,
        createdAt: event.created_at,
      }));
    },
  },
}; 