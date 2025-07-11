'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '../ui/Button'
import { Alert } from '../ui/Alert'

export function EmailVerification() {
  const { data: session, update } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const isEmailVerified = session?.user?.emailVerified

  // Email verification functionality commented out for now
  const sendVerificationEmail = async () => {
    setIsLoading(true)
    setMessage(null)

    try {
      // const response = await fetch('/api/auth/send-verification', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // })

      // const data = await response.json()

      // if (response.ok) {
      //   setMessage({ type: 'success', text: 'Verification email sent! Check your inbox.' })
      // } else {
      //   setMessage({ type: 'error', text: data.error || 'Failed to send verification email' })
      // }
      setMessage({ type: 'success', text: 'Email verification is currently disabled.' })
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to send verification email' })
    } finally {
      setIsLoading(false)
    }
  }

  const refreshSession = async () => {
    await update()
  }

  if (!session?.user?.email) {
    return null
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Email Verification</h3>
          <p className="text-sm text-gray-600">
            {isEmailVerified 
              ? 'Your email is verified' 
              : 'Email verification is currently disabled'
            }
          </p>
        </div>
        {!isEmailVerified && (
          <Button
            onClick={sendVerificationEmail}
            disabled={isLoading}
            variant="outline"
            size="sm"
          >
            {isLoading ? 'Sending...' : 'Email Verification Disabled'}
          </Button>
        )}
      </div>

      {message && (
        <Alert variant={message.type === 'error' ? 'destructive' : 'default'}>
          {message.text}
        </Alert>
      )}

      {!isEmailVerified && (
        <div className="text-sm text-gray-600">
          <p>
            Email verification is currently disabled. All users are automatically verified.
          </p>
        </div>
      )}
    </div>
  )
} 