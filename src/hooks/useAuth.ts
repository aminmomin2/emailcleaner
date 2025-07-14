"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useMe } from "@/hooks/useGraphQLAuth"

export function useAuth() {
  const { data: session, status, update } = useSession()
  const router = useRouter()
  const { data: meData, loading: meLoading, error: meError, refetch: refetchMe } = useMe()

  const isAuthenticated = status === "authenticated"
  const isLoading = status === "loading" || meLoading

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
    user: meData?.me,
    isAuthenticated,
    isLoading,
    login,
    logout,
    requireAuth,
    update,
    meError,
    refetchMe,
  }
} 