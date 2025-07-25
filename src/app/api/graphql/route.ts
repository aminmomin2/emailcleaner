import { NextRequest } from 'next/server';
import { SessionService } from '../lib/services/sessionService';
import { UserService } from '../lib/services/userService';

const MESH_URL = process.env.MESH_URL || 'http://localhost:4000/graphql';

export async function GET(req: NextRequest) {
  const url = MESH_URL;
  const search = req.nextUrl.search;
  const res = await fetch(url + search, {
    method: 'GET',
    headers: req.headers,
  });
  const data = await res.text();
  return new Response(data, {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(req: NextRequest) {
  const url = MESH_URL;
  const body = await req.text();

  // Try to get the session token from cookies (NextAuth v5 and v4 names)
  const sessionToken =
    req.cookies.get('authjs.session-token')?.value ||
    req.cookies.get('__Secure-authjs.session-token')?.value ||
    req.cookies.get('next-auth.session-token')?.value ||
    req.cookies.get('__Secure-next-auth.session-token')?.value;

  let userInfo = null;
  if (sessionToken) {
    const session = await SessionService.getSessionByToken(sessionToken);
    if (session && session.user_id) {
      const user = await UserService.getUserById(session.user_id);
      if (user) {
        userInfo = {
          id: user.id,
          name: user.name,
          email: user.email,
          emailVerified: user.email_verified,
          image: user.image,
          createdAt: user.created_at,
          updatedAt: user.updated_at,
        };
      }
    }
  }

  // Clone headers and add x-user-info if userInfo is present
  const headers = new Headers(req.headers);
  if (userInfo) {
    headers.set('x-user-info', JSON.stringify(userInfo));
  }

  const res = await fetch(url, {
    method: 'POST',
    headers,
    body,
  });
  const data = await res.text();
  return new Response(data, {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  });
} 