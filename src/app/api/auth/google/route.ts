// pages/api/auth/google.ts (or app/api/auth/google/route.ts)
import { google } from 'googleapis';
import { NextApiRequest, NextApiResponse } from 'next';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

const scopes = [
  'https://www.googleapis.com/auth/gmail.modify',
  'https://www.googleapis.com/auth/calendar.events',
  'email',
  'profile',
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const authorizationUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline', // Crucial for getting a refresh token
    scope: scopes,
    prompt: 'consent', // Always prompt for consent to ensure refresh token is issued
  });
  res.redirect(authorizationUrl);
}