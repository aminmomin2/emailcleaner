"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export function useAuth() {
  const { data: session, status, update } = useSession()
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(status === "loading")
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchMe = async () => {
      if (status === "authenticated") {
        setIsLoading(true)
        try {
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