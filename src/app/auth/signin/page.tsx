"use client"

import { signIn } from "next-auth/react"
import AuthHeader from "@/components/auth/AuthHeader"
import Button from "@/components/ui/Button"

export default function SignIn() {
  return (
    <div className="min-h-screen w-full bg-gray-50 ">
      <AuthHeader />
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="bg-white p-8 rounded shadow-md flex flex-col items-center w-[350px]">
          <h2 className="text-2xl font-bold mb-2">Sign in to your account</h2>
          <p className="text-gray-500 mb-6 text-center text-sm">Welcome back! Please sign in to continue.</p>
          <Button
            variant="outline"
            onClick={() => signIn("google", { callbackUrl: "/" })}
            aria-label="Sign in with Google"
            className="w-full flex items-center justify-center gap-3 mb-4"
          >
            <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_17_40)">
                <path d="M47.5 24.5C47.5 22.8 47.3 21.2 47 19.7H24V28.3H37.3C36.7 31.2 34.8 33.6 32 35.2V40.1H39.6C44.1 36.1 47.5 30.9 47.5 24.5Z" fill="#4285F4"/>
                <path d="M24 48C30.5 48 35.9 45.9 39.6 40.1L32 35.2C30.1 36.4 27.7 37.2 24 37.2C17.7 37.2 12.2 33.1 10.3 27.7H2.4V32.8C6.1 40.1 14.3 48 24 48Z" fill="#34A853"/>
                <path d="M10.3 27.7C9.8 26.5 9.5 25.2 9.5 24C9.5 22.8 9.8 21.5 10.3 20.3V15.2H2.4C0.8 18.3 0 21.6 0 24C0 26.4 0.8 29.7 2.4 32.8L10.3 27.7Z" fill="#FBBC05"/>
                <path d="M24 9.8C27.1 9.8 29.7 10.9 31.6 12.7L39.8 5.1C35.9 1.5 30.5 0 24 0C14.3 0 6.1 7.9 2.4 15.2L10.3 20.3C12.2 14.9 17.7 9.8 24 9.8Z" fill="#EA4335"/>
              </g>
              <defs>
                <clipPath id="clip0_17_40">
                  <rect width="48" height="48" fill="white"/>
                </clipPath>
              </defs>
            </svg>
            Sign in with Google
          </Button>
        </div>
      </div>
    </div>
  )
} 