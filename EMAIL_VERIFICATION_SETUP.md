# Email Verification & Credentials Sign-In Setup

This document explains how email verification and credentials sign-in are implemented in your Next.js application.

## Overview

The authentication system supports two sign-in methods:

1. **OAuth Providers (Google, etc.)**: Users are automatically verified
2. **Credentials (Email/Password)**: Users are automatically verified (email verification currently disabled)

## How It Works

### OAuth Users (Google, etc.)
- **Automatically verified**: When users sign in with Google or other OAuth providers, their email is automatically marked as verified
- **No additional steps required**: These users can access all features immediately

### Credentials Users (Email/Password)
- **Automatically verified**: Users who sign up with email/password are automatically verified (email verification disabled)
- **Secure password storage**: Passwords are hashed using bcrypt
- **No verification email**: Email verification is currently commented out
- **Immediate access**: Users can sign in immediately after registration

## Database Schema

The system uses these tables:

### `users` table
- `email_verified`: DATETIME field that stores when the email was verified
- `null` = not verified
- `timestamp` = verified at that time

### `user_passwords` table
- `user_id`: References the users table
- `password_hash`: Bcrypt-hashed password
- `created_at` and `updated_at`: Timestamps

### `verification_tokens` table (REMOVED)
- This table was removed since email verification is disabled

## API Endpoints

### `/api/auth/register` (POST)
- Registers a new user with email/password
- Hashes the password securely
- Automatically verifies the user (email verification disabled)
- Returns user data (without password)

### Email Verification Endpoints (REMOVED)
- `/api/auth/send-verification` - Removed
- `/api/auth/verify-email` - Removed
- These endpoints were removed since email verification is disabled

## Frontend Components

### `SignInForm` component
- Handles both credentials and OAuth sign-in
- Form validation and error handling
- Google OAuth integration

### `RegisterForm` component
- User registration with email/password
- Password confirmation
- Form validation and success/error messages

### `EmailVerification` component
- Shows verification status
- Allows users to request verification emails
- Displays success/error messages

### `/auth/verify-email` page
- Handles verification link clicks
- Shows loading, success, and error states
- Provides navigation options

## Pages

### `/auth/signin`
- Sign-in page with credentials and OAuth options
- Redirects authenticated users to home

### `/auth/register`
- Registration page for new users
- Includes OAuth sign-up option

### Email Verification Pages (REMOVED)
- `/auth/verify-email` - Removed
- Email verification pages were removed since email verification is disabled

### `/test-auth`
- Test page to demonstrate authentication features
- Shows user info and verification status

## Environment Variables

Add these to your `.env.local`:

```env
# Required for authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Google OAuth (required for Google sign-in)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Email service configuration (OPTIONAL - only needed if you re-enable email verification)
# For SendGrid:
# SENDGRID_API_KEY=your_sendgrid_api_key
# EMAIL_FROM=noreply@yourapp.com

# For Mailgun:
# MAILGUN_API_KEY=your_mailgun_api_key
# MAILGUN_DOMAIN=your_domain.com
# EMAIL_FROM=noreply@yourapp.com

# For SMTP:
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=your_email@gmail.com
# SMTP_PASS=your_app_password
# EMAIL_FROM=noreply@yourapp.com
```

## Email Service Integration (DISABLED)

The email service integration has been removed since email verification is disabled. If you want to re-enable email verification in the future, you would need to:

1. Re-create the `EmailService` class
2. Re-create the `VerificationTokenService` class
3. Re-add the verification endpoints
4. Re-add the verification pages
5. Update the database schema to include the verification_tokens table

## Usage

### For Users

#### Sign In
1. **Google OAuth**: Click "Sign in with Google" → Automatically verified
2. **Credentials**: Enter email/password → Check email for verification link

#### Registration
1. **Credentials**: Fill out registration form → Automatically verified
2. **Google OAuth**: Click "Sign up with Google" → Automatically verified

#### Email Verification
1. Email verification is currently disabled
2. All users are automatically verified upon registration

### For Developers

1. **Initialize database**:
   ```bash
   npm run init-db
   ```

2. **Set up environment variables** (see above)

3. **Install email service dependencies** (optional):
   ```bash
   # For SendGrid
   npm install @sendgrid/mail
   
   # For Mailgun
   npm install mailgun.js form-data
   
   # For SMTP
   npm install nodemailer
   ```

4. **Test the authentication flow**:
   - Visit `/auth/register` to create an account
   - Visit `/auth/signin` to sign in
   - Visit `/test-auth` to see authentication status

## Security Features

- **Password hashing**: Passwords are hashed with bcrypt (12 rounds)
- **Token expiration**: Verification tokens expire after 24 hours
- **Single use**: Tokens are deleted after use
- **Secure generation**: Tokens use `crypto.randomUUID()`
- **Email validation**: Only verified emails can be used for verification
- **Session management**: Secure session handling with NextAuth.js

## Customization

### Email Templates
Edit the `EmailService.sendVerificationEmail` method to customize email content and styling.

### Token Expiration
Change the expiration time in `src/app/api/auth/register/route.ts` and `src/app/api/auth/send-verification/route.ts`:

```typescript
const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
```

### Verification Requirements
Modify the `signIn` callback in `src/auth.ts` to change when verification is required.

### Password Requirements
Update the password validation in `src/app/api/auth/register/route.ts`:

```typescript
if (password.length < 6) {
  return NextResponse.json(
    { error: 'Password must be at least 6 characters long' },
    { status: 400 }
  )
}
```

## Testing

Visit `/test-auth` to see a comprehensive demonstration of:
- User authentication status
- Email verification status
- Ability to request verification emails
- Sign out functionality

This page shows different states for OAuth vs credentials users and demonstrates the email verification workflow. 