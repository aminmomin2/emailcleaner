import { NextRequest } from 'next/server';

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
  const res = await fetch(url, {
    method: 'POST',
    headers: req.headers,
    body,
  });
  const data = await res.text();
  return new Response(data, {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  });
} 