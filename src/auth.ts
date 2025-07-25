import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { CustomAdapter } from "./app/api/lib/auth/adapters"
import type { SessionStrategy } from "next-auth";

export const authOptions = {
  adapter: CustomAdapter(),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          access_type: "offline",
          prompt: "consent",
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
    async signIn({ user, account, profile }) {
      console.log('🟠 [NEXTAUTH] signIn callback called for user:', user.email);
      if (account?.provider === "google") {
        user.emailVerified = new Date()
        console.log('✅ [NEXTAUTH] Google user - email verified');
      }
      console.log('✅ [NEXTAUTH] signIn callback returning true');
      return true
    },
    async session({ session, user }) {
      console.log('🟠 [NEXTAUTH] session callback called for user:', user.email);
      if (session.user) {
        session.user.id = user.id
        session.user.emailVerified = user.emailVerified
      }
      console.log('✅ [NEXTAUTH] session callback returning session for user:', user.email);
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