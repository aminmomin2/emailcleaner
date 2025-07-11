"use client"

import { getSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { RegisterForm } from "@/components/auth/RegisterForm"

export default function Register() {
  const router = useRouter()

  useEffect(() => {
    // Check if user is already signed in
    const checkSession = async () => {
      const session = await getSession()
      if (session) {
        router.push("/")
      }
    }
    checkSession()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <RegisterForm />
    </div>
  )
} 