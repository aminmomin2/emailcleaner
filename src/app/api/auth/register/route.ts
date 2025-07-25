import { NextRequest, NextResponse } from 'next/server'
import { CredentialsService } from '../../lib/services/credentialsService'
// import { EmailService } from '../../lib/services/emailService'
// import { VerificationTokenService } from '../../lib/services/verificationTokenService'

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      )
    }

    // Register the user
    const user = await CredentialsService.registerUser(email, password, name)

    // Email verification commented out for now
    // const token = crypto.randomUUID()
    // const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    // await VerificationTokenService.createToken({
    //   identifier: email,
    //   token,
    //   expires: expires.toISOString(),
    // })

    // const verificationUrl = `${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${token}`
    // await EmailService.sendVerificationEmail(email, verificationUrl)

    return NextResponse.json(
      { 
        message: 'User registered successfully! You can now sign in.',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          emailVerified: user.emailVerified,
        }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    
    if ((error as Error).message === 'A user with this email already exists') {
      return NextResponse.json(
        { error: 'A user with this email already exists' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to register user', message: (error as Error).message },
      { status: 500 }
    )
  }
} 