'use client';

import Container from "@/components/ui/Container";
import { request, gql, GraphQLClient } from 'graphql-request';
import { useEffect, useState } from 'react';
import { useAuth } from "@/hooks/useAuth";

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`;

// Define a User type for the UsersList
interface User {
  id: string;
  name: string;
  email: string;
}

// Define types for user emails and calendar events
interface UserEmail {
  id: string;
  fromEmail: string;
  toEmails: string[];
  ccEmails: string[];
  bccEmails: string[];
  subject: string;
  snippet: string;
  internalDate: string;
  isRead: boolean;
  createdAt: string;
  labelIds: string[];
}

interface UserCalendarEvent {
  id: string;
  summary: string;
  description: string;
  startTime: string;
  endTime: string;
  location: string;
  status: string;
  createdAt: string;
}

interface UsersData {
  users: User[];
}

function UsersList() {
  const [data, setData] = useState<UsersData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Use absolute URL for endpoint to avoid Invalid URL error
    const endpoint = typeof window !== 'undefined' ? `${window.location.origin}/api/graphql` : '/api/graphql';
    request<UsersData>(endpoint, GET_USERS)
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {data?.users?.map((user) => (
          <li key={user.id}>{user.name} ({user.email})</li>
        ))}
      </ul>
    </div>
  );
}

export default function Home() {
  const [syncing, setSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);
  const { user, isAuthenticated } = useAuth();

  const userId = (user as User | null)?.id;

  // Emails state
  const [emailsData, setEmailsData] = useState<{ userEmailsByUser: UserEmail[] } | null>(null);
  const [emailsLoading, setEmailsLoading] = useState(false);
  const [emailsError, setEmailsError] = useState<Error | null>(null);

  // Calendar events state
  const [eventsData, setEventsData] = useState<{ userCalendarEventsByUser: UserCalendarEvent[] } | null>(null);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [eventsError, setEventsError] = useState<Error | null>(null);

  useEffect(() => {
    if (isAuthenticated && userId) {
      const endpoint = `${window.location.origin}/api/graphql`;
      const client = new GraphQLClient(endpoint);
      // Debug log for emails request
      console.log("Requesting emails with:", endpoint, userId);
      // Fetch emails
      setEmailsLoading(true);
      client.request<{ userEmailsByUser: UserEmail[] }>(
        `query($userId: ID!) { userEmailsByUser(userId: $userId) { id fromEmail toEmails ccEmails bccEmails subject snippet internalDate isRead createdAt labelIds } }`,
        { userId }
      )
        .then((data) => {
          setEmailsData(data);
          setEmailsLoading(false);
        })
        .catch((err: unknown) => {
          setEmailsError(err instanceof Error ? err : new Error(String(err)));
          setEmailsLoading(false);
          // Log full error stack
          if (err instanceof Error) {
            console.error('Emails request error:', err, err.stack);
          } else {
            console.error('Emails request error:', err);
          }
        });
      // Debug log for events request
      console.log("Requesting events with:", endpoint, userId);
      // Fetch events
      setEventsLoading(true);
      client.request<{ userCalendarEventsByUser: UserCalendarEvent[] }>(
        `query($userId: ID!) { userCalendarEventsByUser(userId: $userId) { id summary description startTime endTime location status createdAt } }`,
        { userId }
      )
        .then((data) => {
          setEventsData(data);
          setEventsLoading(false);
        })
        .catch((err: unknown) => {
          setEventsError(err instanceof Error ? err : new Error(String(err)));
          setEventsLoading(false);
          // Log full error stack
          if (err instanceof Error) {
            console.error('Events request error:', err, err.stack);
          } else {
            console.error('Events request error:', err);
          }
        });
      // Plain fetch test for /api/graphql
      fetch('/api/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: '{ __typename }' })
      })
        .then(res => res.json())
        .then(data => console.log('Plain fetch result:', data))
        .catch(err => console.error('Plain fetch error:', err, err.stack));
    } else {
      setEmailsData(null);
      setEventsData(null);
    }
  }, [isAuthenticated, userId]);

  const handleSync = async () => {
    setSyncing(true);
    setSyncMessage(null);
    try {
      const res = await fetch("/api/sync", { method: "POST" });
      if (res.ok) {
        setSyncMessage("Sync complete!");
        window.location.reload();
      } else {
        const data = await res.json();
        setSyncMessage(data.error || "Sync failed");
      }
    } catch {
      setSyncMessage("Sync failed");
    } finally {
      setSyncing(false);
    }
  };

  return (
    <Container>
      <h1 className="text-3xl font-bold text-[var(--text-main)] mb-6">
        Welcome to OmniDo
      </h1>
      <button
        onClick={handleSync}
        disabled={syncing}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {syncing ? "Syncing..." : "Sync Now"}
      </button>
      {syncMessage && (
        <div className="mb-4 text-sm text-green-600">{syncMessage}</div>
      )}
      <UsersList />

      {/* User Emails Section */}
      {isAuthenticated && userId && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Your Emails</h2>
          {emailsLoading && <div>Loading emails...</div>}
          {emailsError && <div>Error loading emails: {emailsError.message}</div>}
          {emailsData && emailsData.userEmailsByUser && emailsData.userEmailsByUser.length > 0 ? (
            <ul className="mb-4">
              {emailsData.userEmailsByUser.map((email: UserEmail) => (
                <li key={email.id} className="border-b py-2">
                  <div className="font-semibold">{email.subject || '(No Subject)'}</div>
                  <div className="text-xs text-gray-500">From: {email.fromEmail}</div>
                  <div className="text-xs text-gray-500">To: {email.toEmails && email.toEmails.join(', ')}</div>
                  {email.ccEmails && email.ccEmails.length > 0 && (
                    <div className="text-xs text-gray-500">CC: {email.ccEmails.join(', ')}</div>
                  )}
                  {email.bccEmails && email.bccEmails.length > 0 && (
                    <div className="text-xs text-gray-500">BCC: {email.bccEmails.join(', ')}</div>
                  )}
                  <div className="text-xs text-gray-500">Date: {email.internalDate}</div>
                  <div className="text-sm">{email.snippet}</div>
                  {email.labelIds && email.labelIds.length > 0 && (
                    <div className="text-xs text-gray-400">Labels: {email.labelIds.join(', ')}</div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            !emailsLoading && <div>No emails found.</div>
          )}
        </div>
      )}

      {/* User Calendar Events Section */}
      {isAuthenticated && userId && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Your Calendar Events</h2>
          {eventsLoading && <div>Loading events...</div>}
          {eventsError && <div>Error loading events: {eventsError.message}</div>}
          {eventsData && eventsData.userCalendarEventsByUser && eventsData.userCalendarEventsByUser.length > 0 ? (
            <ul className="mb-4">
              {eventsData.userCalendarEventsByUser.map((event: UserCalendarEvent) => (
                <li key={event.id} className="border-b py-2">
                  <div className="font-semibold">{event.summary || '(No Title)'}</div>
                  <div className="text-xs text-gray-500">Start: {event.startTime}</div>
                  <div className="text-xs text-gray-500">End: {event.endTime}</div>
                  <div className="text-sm">{event.description}</div>
                </li>
              ))}
            </ul>
          ) : (
            !eventsLoading && <div>No events found.</div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Dashboard Cards */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-[var(--border)]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[var(--text-main)]">Tasks Pending</h3>
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-[var(--text-main)]">12</p>
          <p className="text-sm text-[var(--text-secondary)] mt-2">Items in your review queue</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-[var(--border)]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[var(--text-main)]">AI Insights</h3>
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-[var(--text-main)]">8</p>
          <p className="text-sm text-[var(--text-secondary)] mt-2">New insights generated</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-[var(--border)]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[var(--text-main)]">Knowledge Base</h3>
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-[var(--text-main)]">156</p>
          <p className="text-sm text-[var(--text-secondary)] mt-2">Articles in your knowledge base</p>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="mt-8 bg-white rounded-lg shadow-sm border border-[var(--border)]">
        <div className="p-6 border-b border-[var(--border)]">
          <h2 className="text-xl font-semibold text-[var(--text-main)]">Recent Activity</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-[var(--text-main)]">New task added to review queue</p>
                <p className="text-xs text-[var(--text-secondary)]">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-[var(--text-main)]">AI generated insights for project Alpha</p>
                <p className="text-xs text-[var(--text-secondary)]">15 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-[var(--text-main)]">Knowledge base article updated</p>
                <p className="text-xs text-[var(--text-secondary)]">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}