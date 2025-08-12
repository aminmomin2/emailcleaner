/**
 * Authentication Hook for EmailCleaner
 * 
 * A custom React hook that provides comprehensive authentication functionality
 * for the EmailCleaner application. It integrates with NextAuth.js and provides
 * a clean interface for managing user authentication state.
 * 
 * Features:
 * - Session management with NextAuth.js
 * - User data fetching and caching
 * - Authentication state management
 * - Login/logout functionality
 * - Route protection utilities
 * - Error handling and loading states
 * 
 * @author Amin Momin
 * @version 1.0.0
 */

"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

/**
 * Custom authentication hook
 * 
 * Provides a comprehensive interface for managing authentication state,
 * user data, and authentication-related operations throughout the application.
 * 
 * @returns {Object} Authentication state and methods
 * @returns {Object} session - NextAuth session object
 * @returns {Object} user - Current user data
 * @returns {boolean} isAuthenticated - Whether user is authenticated
 * @returns {boolean} isLoading - Loading state
 * @returns {Function} login - Login function
 * @returns {Function} logout - Logout function
 * @returns {Function} requireAuth - Route protection function
 * @returns {Function} update - Session update function
 * @returns {Error|null} error - Authentication error if any
 */
export function useAuth() {
  // NextAuth session management
  const { data: session, status, update } = useSession()
  const router = useRouter()
  
  // Local state management
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(status === "loading")
  const [error, setError] = useState<Error | null>(null)

  /**
   * Effect to fetch user data when authentication status changes
   * 
   * When the user is authenticated, this effect fetches detailed user information
   * from the GraphQL API and updates the local state accordingly.
   */
  useEffect(() => {
    const fetchMe = async () => {
      if (status === "authenticated") {
        setIsLoading(true)
        try {
          // Fetch user data from GraphQL API
          const res = await fetch("/api/graphql", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: `query Me { me { id name email emailVerified image createdAt updatedAt } }` }),
          })
          const { data, errors } = await res.json()
          
          if (errors) {
            setError(errors[0])
            setUser(null)
          } else {
            setUser(data?.me || null)
            setError(null)
          }
        } catch (err) {
          setError(err instanceof Error ? err : new Error(String(err)))
          setUser(null)
        } finally {
          setIsLoading(false)
        }
      } else {
        setUser(null)
        setIsLoading(status === "loading")
      }
    }
    fetchMe()
  }, [status])

  const isAuthenticated = status === "authenticated"

  const login = async (provider?: string) => {
    try {
      if (provider) {
        await signIn(provider, { callbackUrl: "/" })
      } else {
        await signIn("google", { callbackUrl: "/" })
      }
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await signOut({ callbackUrl: "/auth/signin" })
    } catch (error) {
      console.error("Logout error:", error)
      throw error
    }
  }

  const requireAuth = () => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
      return false
    }
    return true
  }

  return {
    session,
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    requireAuth,
    update,
    error,
  }
} 