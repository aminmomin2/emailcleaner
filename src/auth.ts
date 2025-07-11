import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { CustomAdapter } from "./app/api/lib/auth/adapters"

export const { auth, handlers } = NextAuth({
  adapter: CustomAdapter(),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          // Import the credentials service
          const { CredentialsService } = await import('./app/api/lib/services/credentialsService')
          
          // Validate credentials
          const user = await CredentialsService.validateCredentials(
            credentials.email,
            credentials.password
          )
          
          return user
        } catch (error) {
          console.error('Credentials validation error:', error)
          return null
        }
      }
    }),
  ],
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // If user is signing in with OAuth (like Google), mark them as verified
      if (account?.provider !== "credentials" && user.email) {
        // OAuth providers have already verified the email, so we can trust it
        // The adapter will handle setting email_verified to the current timestamp
        return true
      }
      
      // For credentials-based signup, allow all users (email verification disabled)
      if (account?.provider === "credentials") {
        // Email verification is commented out for now
        return true
      }
      
      return true
    },
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
        // Add email verification status to session
        session.user.emailVerified = user.emailVerified
      }
      return session
    },
    async jwt({ token, user, account }) {
      // If this is a new sign-in with OAuth, mark email as verified
      if (account && account.provider !== "credentials" && user) {
        token.emailVerified = new Date()
      }
      return token
    }
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  debug: process.env.NODE_ENV === "development",
  trustHost: true,
  secret: process.env.NEXTAUTH_SECRET,
}) 