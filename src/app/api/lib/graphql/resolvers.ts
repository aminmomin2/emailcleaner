import { IResolvers } from '@graphql-tools/utils';
import { UserService } from '../services/userService';
import { AccountService } from '../services/accountService';
import { SessionService } from '../services/sessionService';
import { UserEmailService, UserCalendarEventService } from '../services/userService';

function parseEmailsField(value: string | null | undefined): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed;
    if (typeof parsed === 'string') return [parsed];
    return [];
  } catch {
    return [value];
  }
}

export const resolvers: IResolvers = {
  Query: {
    // User queries
    users: async () => {
      try {
        return await UserService.getAllUsers();
      } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Failed to fetch users');
      }
    },

    user: async (_, { id }: { id: string }) => {
      try {
        return await UserService.getUserById(id);
      } catch (error) {
        console.error('Error fetching user:', error);
        throw new Error('Failed to fetch user');
      }
    },

    userByEmail: async (_, { email }: { email: string }) => {
      try {
        return await UserService.getUserByEmail(email);
      } catch (error) {
        console.error('Error fetching user by email:', error);
        throw new Error('Failed to fetch user by email');
      }
    },

    me: async () => {
      try {
        // For now, return the first user as "me"
        // In a real app, you'd get the user from the session/token
        const users = await UserService.getAllUsers();
        return users[0] || null;
      } catch (error) {
        console.error('Error fetching current user:', error);
        throw new Error('Failed to fetch current user');
      }
    },

    userEmails: async () => {
      const emails = await UserEmailService.getAllUserEmails();
      return emails.map(email => ({ ...email }));
    },

    userEmail: async (_, { id }) => {
      const email = await UserEmailService.getUserEmailById(id);
      return email ? { ...email } : null;
    },

    userEmailsByUser: async (_, { userId }) => {
      const emails = await UserEmailService.getUserEmailsByUserId(userId);
      return emails.map(email => ({ ...email }));
    },

    userCalendarEvents: async () => {
      return await UserCalendarEventService.getAllUserCalendarEvents();
    },

    userCalendarEvent: async (_, { id }) => {
      return await UserCalendarEventService.getUserCalendarEventById(id);
    },

    userCalendarEventsByUser: async (_, { userId }) => {
      return await UserCalendarEventService.getUserCalendarEventsByUserId(userId);
    },

    // Account queries
    accounts: async () => {
      try {
        return await AccountService.getAllAccounts();
      } catch (error) {
        console.error('Error fetching accounts:', error);
        throw new Error('Failed to fetch accounts');
      }
    },

    account: async (_, { id }: { id: string }) => {
      try {
        return await AccountService.getAccountById(id);
      } catch (error) {
        console.error('Error fetching account:', error);
        throw new Error('Failed to fetch account');
      }
    },

    accountsByUser: async (_, { userId }: { userId: string }) => {
      try {
        return await AccountService.getAccountsByUserId(userId);
      } catch (error) {
        console.error('Error fetching user accounts:', error);
        throw new Error('Failed to fetch user accounts');
      }
    },

    // Session queries
    sessions: async () => {
      try {
        return await SessionService.getAllSessions();
      } catch (error) {
        console.error('Error fetching sessions:', error);
        throw new Error('Failed to fetch sessions');
      }
    },

    session: async (_, { id }: { id: string }) => {
      try {
        return await SessionService.getSessionById(id);
      } catch (error) {
        console.error('Error fetching session:', error);
        throw new Error('Failed to fetch session');
      }
    },

    sessionsByUser: async (_, { userId }: { userId: string }) => {
      try {
        return await SessionService.getSessionsByUserId(userId);
      } catch (error) {
        console.error('Error fetching user sessions:', error);
        throw new Error('Failed to fetch user sessions');
      }
    },
  },

  Mutation: {
    // User mutations
    createUser: async (_, input) => {
      try {
        // Map camelCase input fields to snake_case for database
        const mappedInput = {
          name: input.name,
          email: input.email,
          email_verified: input.emailVerified,
          image: input.image,
        };
        return await UserService.createUser(mappedInput);
      } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Failed to create user');
      }
    },

    updateUser: async (_, { id, input }) => {
      try {
        // Map camelCase input fields to snake_case for database
        const mappedInput = {
          name: input.name,
          email: input.email,
          email_verified: input.emailVerified,
          image: input.image,
        };
        const updatedUser = await UserService.updateUser(id, mappedInput);
        if (!updatedUser) {
          throw new Error('User not found');
        }
        return updatedUser;
      } catch (error) {
        console.error('Error updating user:', error);
        throw new Error('Failed to update user');
      }
    },

    deleteUser: async (_, { id }: { id: string }) => {
      try {
        return await UserService.deleteUser(id);
      } catch (error) {
        console.error('Error deleting user:', error);
        throw new Error('Failed to delete user');
      }
    },

    // Account mutations
    createAccount: async (_, input) => {
      try {
        // Map camelCase input fields to snake_case for database
        const mappedInput = {
          user_id: input.userId,
          type: input.type,
          provider: input.provider,
          provider_account_id: input.providerAccountId,
          refresh_token: input.refreshToken,
          access_token: input.accessToken,
          expires_at: input.expiresAt,
          token_type: input.tokenType,
          scope: input.scope,
          id_token: input.idToken,
          session_state: input.sessionState,
        };
        return await AccountService.createAccount(mappedInput);
      } catch (error) {
        console.error('Error creating account:', error);
        throw new Error('Failed to create account');
      }
    },

    updateAccount: async (_, { id, input }) => {
      try {
        // Map camelCase input fields to snake_case for database
        const mappedInput = {
          type: input.type,
          provider: input.provider,
          provider_account_id: input.providerAccountId,
          refresh_token: input.refreshToken,
          access_token: input.accessToken,
          expires_at: input.expiresAt,
          token_type: input.tokenType,
          scope: input.scope,
          id_token: input.idToken,
          session_state: input.sessionState,
        };
        const updatedAccount = await AccountService.updateAccount(id, mappedInput);
        if (!updatedAccount) {
          throw new Error('Account not found');
        }
        return updatedAccount;
      } catch (error) {
        console.error('Error updating account:', error);
        throw new Error('Failed to update account');
      }
    },

    deleteAccount: async (_, { id }) => {
      try {
        return await AccountService.deleteAccount(id);
      } catch (error) {
        console.error('Error deleting account:', error);
        throw new Error('Failed to delete account');
      }
    },

    // Session mutations
    createSession: async (_, input) => {
      try {
        // Map camelCase input fields to snake_case for database
        const mappedInput = {
          session_token: input.sessionToken,
          user_id: input.userId,
          expires: input.expires,
        };
        return await SessionService.createSession(mappedInput);
      } catch (error) {
        console.error('Error creating session:', error);
        throw new Error('Failed to create session');
      }
    },

    updateSession: async (_, { id, input }) => {
      try {
        // Map camelCase input fields to snake_case for database
        const mappedInput = {
          session_token: input.sessionToken,
          expires: input.expires,
        };
        const updatedSession = await SessionService.updateSession(id, mappedInput);
        if (!updatedSession) {
          throw new Error('Session not found');
        }
        return updatedSession;
      } catch (error) {
        console.error('Error updating session:', error);
        throw new Error('Failed to update session');
      }
    },

    deleteSession: async (_, { id }) => {
      try {
        return await SessionService.deleteSession(id);
      } catch (error) {
        console.error('Error deleting session:', error);
        throw new Error('Failed to delete session');
      }
    },

    createUserEmail: async (_, { input }) => {
      // Map camelCase to snake_case
      const mappedInput = {
        user_id: input.userId,
        provider_email_id: input.providerEmailId,
        thread_id: input.threadId,
        from_email: input.fromEmail,
        to_emails: input.toEmails,
        cc_emails: input.ccEmails,
        bcc_emails: input.bccEmails,
        subject: input.subject,
        snippet: input.snippet,
        internal_date: input.internalDate,
        is_read: input.isRead,
        label_ids: input.labelIds,
        status: input.status,
        raw_body_hash: input.rawBodyHash,
      };
      return await UserEmailService.createUserEmail(mappedInput);
    },

    updateUserEmail: async (_, { id, input }) => {
      // Map camelCase to snake_case
      const mappedInput = {
        thread_id: input.threadId,
        from_email: input.fromEmail,
        to_emails: input.toEmails,
        cc_emails: input.ccEmails,
        bcc_emails: input.bccEmails,
        subject: input.subject,
        snippet: input.snippet,
        internal_date: input.internalDate,
        is_read: input.isRead,
        label_ids: input.labelIds,
        status: input.status,
        raw_body_hash: input.rawBodyHash,
      };
      return await UserEmailService.updateUserEmail(id, mappedInput);
    },

    deleteUserEmail: async (_, { id }) => {
      return await UserEmailService.deleteUserEmail(id);
    },

    createUserCalendarEvent: async (_, { input }) => {
      // Map camelCase to snake_case
      const mappedInput = {
        user_id: input.userId,
        provider_event_id: input.providerEventId,
        calendar_id: input.calendarId,
        summary: input.summary,
        description: input.description,
        start_time: input.startTime,
        end_time: input.endTime,
        location: input.location,
        attendees: input.attendees,
        status: input.status,
        html_link: input.htmlLink,
      };
      return await UserCalendarEventService.createUserCalendarEvent(mappedInput);
    },

    updateUserCalendarEvent: async (_, { id, input }) => {
      // Map camelCase to snake_case
      const mappedInput = {
        summary: input.summary,
        description: input.description,
        start_time: input.startTime,
        end_time: input.endTime,
        location: input.location,
        attendees: input.attendees,
        status: input.status,
        html_link: input.htmlLink,
      };
      return await UserCalendarEventService.updateUserCalendarEvent(id, mappedInput);
    },

    deleteUserCalendarEvent: async (_, { id }) => {
      return await UserCalendarEventService.deleteUserCalendarEvent(id);
    },
  },

  // Field resolvers for relationships
  User: {
    // Map snake_case database fields to camelCase GraphQL fields
    emailVerified: (parent) => {
      console.log('emailVerified resolver, parent:', parent);
      return parent.email_verified;
    },
    createdAt: (parent) => {
      console.log('createdAt resolver, parent:', parent);
      console.log('created_at value:', parent.created_at);
      return parent.created_at;
    },
    updatedAt: (parent) => {
      console.log('updatedAt resolver, parent:', parent);
      console.log('updated_at value:', parent.updated_at);
      return parent.updated_at;
    },
    
    accounts: async (parent) => {
      try {
        return await AccountService.getAccountsByUserId(parent.id);
      } catch (error) {
        console.error('Error fetching user accounts:', error);
        return [];
      }
    },

    sessions: async (parent) => {
      try {
        return await SessionService.getSessionsByUserId(parent.id);
      } catch (error) {
        console.error('Error fetching user sessions:', error);
        return [];
      }
    },

    emails: async (parent) => {
      return await UserEmailService.getUserEmailsByUserId(parent.id);
    },

    calendarEvents: async (parent) => {
      return await UserCalendarEventService.getUserCalendarEventsByUserId(parent.id);
    },
  },

  Account: {
    // Map snake_case database fields to camelCase GraphQL fields
    userId: (parent) => parent.user_id,
    providerAccountId: (parent) => parent.provider_account_id,
    refreshToken: (parent) => parent.refresh_token,
    accessToken: (parent) => parent.access_token,
    expiresAt: (parent) => parent.expires_at,
    tokenType: (parent) => parent.token_type,
    idToken: (parent) => parent.id_token,
    sessionState: (parent) => parent.session_state,
    createdAt: (parent) => parent.created_at,
    updatedAt: (parent) => parent.updated_at,
    
    user: async (parent) => {
      try {
        return await UserService.getUserById(parent.user_id);
      } catch (error) {
        console.error('Error fetching account user:', error);
        return null;
      }
    },
  },

  Session: {
    // Map snake_case database fields to camelCase GraphQL fields
    sessionToken: (parent) => parent.session_token,
    userId: (parent) => parent.user_id,
    createdAt: (parent) => parent.created_at,
    updatedAt: (parent) => parent.updated_at,
    
    user: async (parent) => {
      try {
        return await UserService.getUserById(parent.user_id);
      } catch (error) {
        console.error('Error fetching session user:', error);
        return null;
      }
    },
  },

  UserEmail: {
    userId: (parent) => parent.user_id,
    providerEmailId: (parent) => parent.provider_email_id,
    threadId: (parent) => parent.thread_id,
    fromEmail: (parent) => {
      if (!parent.from_email) return null;
      if (Array.isArray(parent.from_email)) return parent.from_email.join(', ');
      try {
        const parsed = JSON.parse(parent.from_email);
        if (Array.isArray(parsed)) return parsed.join(', ');
        if (typeof parsed === 'string') return parsed;
        return String(parent.from_email);
      } catch {
        return parent.from_email;
      }
    },
    toEmails: (parent) => {
      console.log('toEmails resolver called:', parent.to_emails);
      return parseEmailsField(parent.to_emails);
    },
    ccEmails: (parent) => parseEmailsField(parent.cc_emails),
    bccEmails: (parent) => parseEmailsField(parent.bcc_emails),
    subject: (parent) => parent.subject,
    snippet: (parent) => parent.snippet,
    internalDate: (parent) => parent.internal_date,
    receivedAt: (parent) => parent.received_at,
    isRead: (parent) => parent.is_read,
    labelIds: (parent) => parseEmailsField(parent.label_ids),
    status: (parent) => parent.status,
    rawBodyHash: (parent) => parent.raw_body_hash,
    createdAt: (parent) => parent.created_at,
    updatedAt: (parent) => parent.updated_at,
  },

  UserCalendarEvent: {
    userId: (parent) => parent.user_id,
    providerEventId: (parent) => parent.provider_event_id,
    calendarId: (parent) => parent.calendar_id,
    summary: (parent) => parent.summary,
    description: (parent) => parent.description,
    startTime: (parent) => parent.start_time,
    endTime: (parent) => parent.end_time,
    location: (parent) => parent.location,
    attendees: (parent) => parent.attendees,
    status: (parent) => parent.status,
    htmlLink: (parent) => parent.html_link,
    ingestedAt: (parent) => parent.ingested_at,
    createdAt: (parent) => parent.created_at,
    updatedAt: (parent) => parent.updated_at,
  },
}; 