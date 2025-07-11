# Authentication Setup Guide

This guide will help you set up the complete authentication flow with Google OAuth and MySQL database integration.

## Prerequisites

1. **MySQL Database**: Make sure you have a MySQL database running
2. **Google OAuth Credentials**: You'll need to create OAuth credentials in the Google Cloud Console

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_ai_assistant_auth_db
DB_PORT=3306

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_key
```

## Google OAuth Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" and create OAuth 2.0 Client ID
5. Set the authorized redirect URI to: `http://localhost:3000/api/auth/callback/google` (NextAuth.js handles this automatically)
6. Copy the Client ID and Client Secret to your `.env.local` file

## Database Setup

1. Create a MySQL database:
```sql
CREATE DATABASE your_ai_assistant_auth_db;
```

2. Run the database initialization script:
```bash
npm run init-db
```

This will create the following tables:
- `users`: Stores user profiles
- `accounts`: Stores OAuth provider accounts
- `sessions`: Stores active user sessions

## Authentication Flow

### Components Created

1. **Custom Database Adapter** (`src/app/api/lib/auth/adapters.ts`)
   - Handles user, account, and session management
   - Integrates with MySQL database

2. **NextAuth Configuration** (`src/app/api/auth/[...nextauth]/route.ts`)
   - Configured with Google OAuth provider
   - Uses database session strategy
   - Includes custom callbacks

3. **Authentication Pages**
   - Sign-in page (`src/app/auth/signin/page.tsx`)
   - Error page (`src/app/auth/error/page.tsx`)

4. **Authentication Hooks** (`src/hooks/useAuth.ts`)
   - Provides authentication utilities
   - Handles login/logout
   - Session management

5. **Protected Route Component** (`src/components/auth/ProtectedRoute.tsx`)
   - Wraps components that require authentication
   - Redirects unauthenticated users

6. **Middleware** (`src/middleware.ts`)
   - Protects routes at the server level
   - Handles authentication redirects

### Usage Examples

#### Protecting a Page
```tsx
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'

export default function ProtectedPage() {
  return (
    <ProtectedRoute>
      <div>This content is only visible to authenticated users</div>
    </ProtectedRoute>
  )
}
```

#### Using Authentication in Components
```tsx
import { useAuth } from '@/hooks/useAuth'

export default function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth()

  if (!isAuthenticated) {
    return <button onClick={login}>Sign In</button>
  }

  return (
    <div>
      <p>Welcome, {user?.name}!</p>
      <button onClick={logout}>Sign Out</button>
    </div>
  )
}
```

## Database Schema

The authentication system uses three main tables:

### Users Table
```sql
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    email_verified DATETIME NULL,
    image TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Accounts Table
```sql
CREATE TABLE accounts (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    type VARCHAR(255) NOT NULL,
    provider VARCHAR(255) NOT NULL,
    provider_account_id VARCHAR(255) NOT NULL,
    refresh_token TEXT NULL,
    access_token TEXT NULL,
    expires_at BIGINT NULL,
    token_type VARCHAR(255) NULL,
    scope TEXT NULL,
    id_token TEXT NULL,
    session_state VARCHAR(255) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT unique_provider_account UNIQUE (provider, provider_account_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### Sessions Table
```sql
CREATE TABLE sessions (
    id VARCHAR(36) PRIMARY KEY,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    expires DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## Testing the Setup

1. Start the development server:
```bash
npm run dev
```

2. Navigate to `http://localhost:3000`
3. You should be redirected to the sign-in page
4. Click "Sign in with Google"
5. Complete the OAuth flow
6. You should be redirected back to the home page

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check your database credentials in `.env.local`
   - Ensure MySQL is running
   - Verify the database exists

2. **Google OAuth Error**
   - Verify your Google OAuth credentials
   - Check that the redirect URI matches exactly
   - Ensure the Google+ API is enabled

3. **Session Issues**
   - Check that `NEXTAUTH_SECRET` is set
   - Verify the database tables were created correctly
   - Check the browser console for errors

### Debug Mode

To enable debug mode, add this to your `.env.local`:
```env
NODE_ENV=development
```

This will show detailed NextAuth logs in the console.

## Security Considerations

1. **Environment Variables**: Never commit `.env.local` to version control
2. **Database Security**: Use strong passwords and limit database access
3. **HTTPS**: Use HTTPS in production
4. **Session Security**: Regularly rotate `NEXTAUTH_SECRET`
5. **OAuth Scopes**: Only request necessary OAuth scopes

## Production Deployment

1. Update `NEXTAUTH_URL` to your production domain
2. Update Google OAuth redirect URIs
3. Use a production MySQL database
4. Set `NODE_ENV=production`
5. Use a strong `NEXTAUTH_SECRET`

## API Endpoints

The authentication system provides the following API endpoints:

- `GET/POST /api/auth/signin` - Sign in page
- `GET/POST /api/auth/signout` - Sign out
- `GET /api/auth/session` - Get current session
- `GET /api/auth/csrf` - Get CSRF token
- `GET /api/auth/providers` - Get available providers
- `GET /api/auth/callback/google` - Google OAuth callback (handled by NextAuth.js)

All endpoints are automatically handled by NextAuth.js. 