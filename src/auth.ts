/**
 * NextAuth.js Configuration for EmailCleaner
 * 
 * This file configures authentication for the EmailCleaner application using NextAuth.js.
 * It sets up Google OAuth provider with Gmail and Calendar scopes, custom database adapter,
 * and session management for secure user authentication.
 * 
 * Features:
 * - Google OAuth 2.0 authentication
 * - Gmail and Calendar API access scopes
 * - Custom MySQL database adapter
 * - Secure session management
 * - Automatic token refresh
 * 
 * @author Amin Momin
 * @version 1.0.0
 */

import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { CustomAdapter } from "./app/api/lib/auth/adapters"
import type { SessionStrategy } from "next-auth";

/**
 * NextAuth configuration object
 * 
 * Defines authentication providers, session strategy, callbacks, and security settings
 * for the EmailCleaner application.
 */
export const authOptions = {
  // Custom MySQL adapter for user and session management
  adapter: CustomAdapter(),
  
  // Authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          // Request offline access for token refresh
          access_type: "offline",
          // Always prompt for consent to ensure fresh tokens
          prompt: "consent",
          // Required scopes for Gmail and Calendar access
          scope: [
            "openid",
            "email",
            "profile",
            "https://www.googleapis.com/auth/gmail.modify",
            "https://www.googleapis.com/auth/calendar.events"
          ].join(" "),
        },
      },
    }),
  ],
  session: {
    strategy: "database" as SessionStrategy,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({ user, account, profile }: { user: any; account: any; profile?: any }) {
      if (account?.provider === "google") {
        user.emailVerified = new Date()
      }
      return true
    },
    async session({ session, user }: { session: any; user: any }) {
      if (session.user) {
        session.user.id = user.id
        session.user.emailVerified = user.emailVerified
      }
      return session
    }
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  debug: process.env.NODE_ENV === "development",
  trustHost: true,
  secret: process.env.NEXTAUTH_SECRET,
};

export const { auth, handlers } = NextAuth(authOptions); 