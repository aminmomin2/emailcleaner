import { OAuth2Client } from 'google-auth-library';
import { AccountService } from '../services/accountService';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI!;

/**
 * Returns an authenticated Google OAuth2Client for the given userId.
 * Handles token decryption, refresh, and DB update if a new refresh_token is issued.
 */
export async function getAuthenticatedGoogleClient(userId: string) {
  // Fetch the Google account for this user
  const accounts = await AccountService.getAccountsByUserId(userId);
  const googleAccount = accounts.find(
    (acc) => acc.provider === 'google' && acc.refresh_token && acc.access_token
  );
  if (!googleAccount) {
    throw new Error('No Google account with tokens found for this user');
  }

  const oauth2Client = new OAuth2Client({
    clientId: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    redirectUri: GOOGLE_REDIRECT_URI,
  });

  oauth2Client.setCredentials({
    access_token: googleAccount.access_token!,
    refresh_token: googleAccount.refresh_token!,
    expiry_date: googleAccount.expires_at ? googleAccount.expires_at * 1000 : undefined,
  });

  // Ensure the access token is valid and refresh if needed
  try {
    await oauth2Client.getAccessToken();
  } catch (error) {
    // If we get an invalid_grant error, the refresh token is expired/invalid
    if (error instanceof Error && error.message.includes('invalid_grant')) {
      // Clear the invalid tokens from the database
      await AccountService.updateAccount(googleAccount.id, {
        refresh_token: null,
        access_token: null,
        expires_at: null,
      });
      throw new Error('OAuth tokens have expired. Please re-authenticate with Google.');
    }
    throw error;
  }
  const credentials = oauth2Client.credentials;

  // If a new refresh_token is issued, update the DB
  if (credentials.refresh_token && credentials.refresh_token !== googleAccount.refresh_token) {
    await AccountService.updateAccount(googleAccount.id, {
      refresh_token: credentials.refresh_token,
    });
  }
  // If a new access_token is issued, update the DB
  if (credentials.access_token && credentials.access_token !== googleAccount.access_token) {
    await AccountService.updateAccount(googleAccount.id, {
      access_token: credentials.access_token,
      expires_at: credentials.expiry_date ? Math.floor(credentials.expiry_date / 1000) : undefined,
    });
  }

  return oauth2Client;
} 