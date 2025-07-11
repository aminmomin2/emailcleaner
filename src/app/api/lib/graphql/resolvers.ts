import { IResolvers } from '@graphql-tools/utils';
import { UserService } from '../services/userService';
import { AccountService } from '../services/accountService';
import { SessionService } from '../services/sessionService';

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
}; 