"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export function useAuth() {
  const { data: session, status, update } = useSession()
  const router = useRouter()

  const isAuthenticated = status === "authenticated"
  const isLoading = status === "loading"

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
    user: session?.user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    requireAuth,
    update,
  }
} 