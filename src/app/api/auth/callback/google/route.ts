// pages/api/auth/callback/google.ts (or app/api/auth/callback/google/route.ts)
import { google } from 'googleapis';
import { NextApiRequest, NextApiResponse } from 'next';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query;

  if (!code || typeof code !== 'string') {
    return res.status(400).send('Authorization code missing.');
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);
    // tokens will contain: access_token, refresh_token (if access_type='offline' was used), expiry_date, token_type, id_token

    // --- IMPORTANT: Securely Store Tokens ---
    // You MUST store tokens.refresh_token in your database associated with the user.
    // This refresh token allows you to get new access tokens without user re-authentication.
    // encrypt tokens.refresh_token before storing!
    // Example (conceptual): await db.saveUserTokens(userId, tokens.refresh_token, tokens.access_token);

    // For demonstration, let's just log them (NEVER do this in production)
    console.log('Access Token:', tokens.access_token);
    console.log('Refresh Token:', tokens.refresh_token); // Store this securely!
    console.log('ID Token:', tokens.id_token); // Contains basic user info

    // You might want to redirect the user back to your dashboard or a success page
    res.redirect('/dashboard?auth_status=success');

  } catch (error) {
    console.error('Error getting tokens:', error);
    res.status(500).send('Authentication failed.');
  }
}