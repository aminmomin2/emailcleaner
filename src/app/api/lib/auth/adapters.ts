import { Adapter, AdapterUser, AdapterAccount, AdapterSession } from "next-auth/adapters"
import { UserService } from "../services/userService"
import { AccountService } from "../services/accountService"
import { SessionService } from "../services/sessionService"
import { CredentialsService } from "../services/credentialsService"
import { toMySQLDateTime } from "../utils/datetime"

export function CustomAdapter(): Adapter {
  console.log("🔵 [ADAPTER] CustomAdapter initialized");
  return {
    async createUser(user) {
      try {
        // Check if email is verified based on the user object passed from NextAuth callbacks
        // NextAuth callbacks will set emailVerified for Google users and null for credentials users
        const isEmailVerified = user.emailVerified !== undefined && user.emailVerified !== null
        
        const createdUser = await UserService.createUser({
          name: user.name || undefined,
          email: user.email,
          email_verified: isEmailVerified ? new Date().toISOString() : undefined, // Set based on provider
          image: user.image || undefined,
        })
        
        return {
          id: createdUser.id,
          name: createdUser.name,
          email: createdUser.email,
          emailVerified: createdUser.email_verified ? new Date(createdUser.email_verified) : null,
          image: createdUser.image,
        } as AdapterUser
      } catch (error) {
        console.error("Error creating user:", error)
        throw error
      }
    },

    async getUser(id) {
      try {
        const user = await UserService.getUserById(id)
        if (!user) return null
        
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          emailVerified: user.email_verified ? new Date(user.email_verified) : null,
          image: user.image,
        } as AdapterUser
      } catch (error) {
        console.error("Error getting user:", error)
        return null
      }
    },

    async getUserByEmail(email) {
      try {
        const user = await UserService.getUserByEmail(email)
        if (!user) return null
        
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          emailVerified: user.email_verified ? new Date(user.email_verified) : null,
          image: user.image,
        } as AdapterUser
      } catch (error) {
        console.error("Error getting user by email:", error)
        return null
      }
    },

    async getUserByAccount({ provider, providerAccountId }) {
      try {
        const accounts = await AccountService.getAllAccounts()
        const account = accounts.find(
          acc => acc.provider === provider && acc.provider_account_id === providerAccountId
        )
        
        if (!account) return null
        
        const user = await UserService.getUserById(account.user_id)
        if (!user) return null
        
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          emailVerified: user.email_verified ? new Date(user.email_verified) : null,
          image: user.image,
        } as AdapterUser
      } catch (error) {
        console.error("Error getting user by account:", error)
        return null
      }
    },

    async updateUser(user) {
      try {
        const updatedUser = await UserService.updateUser(user.id, {
          name: user.name || undefined,
          email: user.email || undefined,
          email_verified: user.emailVerified ? toMySQLDateTime(user.emailVerified) : null,
          image: user.image || undefined,
        })
        
        if (!updatedUser) throw new Error("Failed to update user")
        
        return {
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
          emailVerified: updatedUser.email_verified ? new Date(updatedUser.email_verified) : null,
          image: updatedUser.image,
        } as AdapterUser
      } catch (error) {
        console.error("Error updating user:", error)
        throw error
      }
    },

    async deleteUser(userId) {
      try {
        // Delete user password if it exists
        await CredentialsService.deletePassword(userId)
        await UserService.deleteUser(userId)
        return null
      } catch (error) {
        console.error("Error deleting user:", error)
        throw error
      }
    },

    async linkAccount(account) {
      try {
        const createdAccount = await AccountService.createAccount({
          user_id: account.userId,
          type: account.type,
          provider: account.provider,
          provider_account_id: account.providerAccountId,
          refresh_token: account.refresh_token || undefined,
          access_token: account.access_token || undefined,
          expires_at: account.expires_at || undefined,
          token_type: account.token_type || undefined,
          scope: account.scope || undefined,
          id_token: account.id_token || undefined,
          session_state: account.session_state || undefined,
        })
        
        return {
          id: createdAccount.id,
          userId: createdAccount.user_id,
          type: createdAccount.type,
          provider: createdAccount.provider,
          providerAccountId: createdAccount.provider_account_id,
          refresh_token: createdAccount.refresh_token,
          access_token: createdAccount.access_token,
          expires_at: createdAccount.expires_at,
          token_type: createdAccount.token_type,
          scope: createdAccount.scope,
          id_token: createdAccount.id_token,
          session_state: createdAccount.session_state,
        } as AdapterAccount
      } catch (error) {
        console.error("Error linking account:", error)
        throw error
      }
    },

    async unlinkAccount({ provider, providerAccountId }) {
      try {
        const accounts = await AccountService.getAllAccounts()
        const account = accounts.find(
          acc => acc.provider === provider && acc.provider_account_id === providerAccountId
        )
        
        if (account) {
          await AccountService.deleteAccount(account.id)
        }
        
        return undefined
      } catch (error) {
        console.error("Error unlinking account:", error)
        throw error
      }
    },

    async createSession(session) {
      console.log("🔵 [ADAPTER] createSession method called!");
      try {
        console.log("🔵 [ADAPTER] createSession called with:", {
          sessionToken: session.sessionToken,
          userId: session.userId,
          expires: session.expires,
          expiresMySQL: toMySQLDateTime(session.expires)
        })
        
        const createdSession = await SessionService.createSession({
          session_token: session.sessionToken,
          user_id: session.userId,
          expires: toMySQLDateTime(session.expires),
        })
        
        console.log("✅ [ADAPTER] Session created successfully:", createdSession)
        
        return {
          sessionToken: createdSession.session_token,
          userId: createdSession.user_id,
          expires: new Date(createdSession.expires),
        } as AdapterSession
      } catch (error) {
        console.error("❌ [ADAPTER] Error creating session:", error)
        throw error
      }
    },

    async getSessionAndUser(sessionToken) {
      console.log("🔵 [ADAPTER] getSessionAndUser called with token:", sessionToken.substring(0, 20) + "...");
      try {
        const session = await SessionService.getSessionByToken(sessionToken)
        console.log("🔵 [ADAPTER] getSessionAndUser - session found:", !!session);
        if (!session) return null
        
        const user = await UserService.getUserById(session.user_id)
        console.log("🔵 [ADAPTER] getSessionAndUser - user found:", !!user);
        if (!user) return null
        
        return {
          session: {
            sessionToken: session.session_token,
            userId: session.user_id,
            expires: new Date(session.expires),
          } as AdapterSession,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            emailVerified: user.email_verified ? new Date(user.email_verified) : null,
            image: user.image,
          } as AdapterUser,
        }
      } catch (error) {
        console.error("❌ [ADAPTER] Error getting session and user:", error)
        return null
      }
    },

    async updateSession(session) {
      try {
        const sessions = await SessionService.getAllSessions()
        const existingSession = sessions.find(s => s.session_token === session.sessionToken)
        
        if (!existingSession) return null
        
        const updatedSession = await SessionService.updateSession(existingSession.id, {
          expires: toMySQLDateTime(session.expires),
        })
        
        if (!updatedSession) return null
        
        return {
          sessionToken: updatedSession.session_token,
          userId: updatedSession.user_id,
          expires: new Date(updatedSession.expires),
        } as AdapterSession
      } catch (error) {
        console.error("Error updating session:", error)
        return null
      }
    },

    async deleteSession(sessionToken) {
      try {
        const sessions = await SessionService.getAllSessions()
        const session = sessions.find(s => s.session_token === sessionToken)
        
        if (session) {
          await SessionService.deleteSession(session.id)
        }
        
        return null
      } catch (error) {
        console.error("Error deleting session:", error)
        throw error
      }
    },

    async createVerificationToken(token) {
      // Email verification is disabled
      return null
    },

    async useVerificationToken(token) {
      // Email verification is disabled
      return null
    },
  }
} 