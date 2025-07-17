// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace MySqlTypes {
  export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  /** The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text. */
  String: { input: string; output: string; }
  /** The `Boolean` scalar type represents `true` or `false`. */
  Boolean: { input: boolean; output: boolean; }
  /** The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. */
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  BigInt: { input: bigint; output: bigint; }
  /** The javascript `Date` as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: { input: Date | string | number; output: Date | string | number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: Date | string; output: Date | string; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
};

export type Query = {
  accounts?: Maybe<Array<Maybe<accounts>>>;
  count_accounts?: Maybe<Scalars['Int']['output']>;
  sessions?: Maybe<Array<Maybe<sessions>>>;
  count_sessions?: Maybe<Scalars['Int']['output']>;
  user_calendar_events?: Maybe<Array<Maybe<user_calendar_events>>>;
  count_user_calendar_events?: Maybe<Scalars['Int']['output']>;
  user_emails?: Maybe<Array<Maybe<user_emails>>>;
  count_user_emails?: Maybe<Scalars['Int']['output']>;
  users?: Maybe<Array<Maybe<users>>>;
  count_users?: Maybe<Scalars['Int']['output']>;
};


export type QueryaccountsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<accounts_WhereInput>;
  orderBy?: InputMaybe<accounts_OrderByInput>;
};


export type Querycount_accountsArgs = {
  where?: InputMaybe<accounts_WhereInput>;
};


export type QuerysessionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<sessions_WhereInput>;
  orderBy?: InputMaybe<sessions_OrderByInput>;
};


export type Querycount_sessionsArgs = {
  where?: InputMaybe<sessions_WhereInput>;
};


export type Queryuser_calendar_eventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<user_calendar_events_WhereInput>;
  orderBy?: InputMaybe<user_calendar_events_OrderByInput>;
};


export type Querycount_user_calendar_eventsArgs = {
  where?: InputMaybe<user_calendar_events_WhereInput>;
};


export type Queryuser_emailsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<user_emails_WhereInput>;
  orderBy?: InputMaybe<user_emails_OrderByInput>;
};


export type Querycount_user_emailsArgs = {
  where?: InputMaybe<user_emails_WhereInput>;
};


export type QueryusersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<users_WhereInput>;
  orderBy?: InputMaybe<users_OrderByInput>;
};


export type Querycount_usersArgs = {
  where?: InputMaybe<users_WhereInput>;
};

export type accounts = {
  /** Unique ID for this specific account link (UUID) */
  id: Scalars['String']['output'];
  /** Foreign key linking to the users table */
  user_id: Scalars['String']['output'];
  /** Type of account (e.g., 'oauth', 'email', 'credentials') */
  type: Scalars['String']['output'];
  /** The OAuth provider name (e.g., 'google', 'azure-ad') */
  provider: Scalars['String']['output'];
  /** The unique ID of the user from the OAuth provider (e.g., Google's internal user ID) */
  provider_account_id: Scalars['String']['output'];
  /** Encrypted refresh token from the OAuth provider, used to get new access tokens */
  refresh_token?: Maybe<Scalars['String']['output']>;
  /** Encrypted access token from the OAuth provider, used for API calls */
  access_token?: Maybe<Scalars['String']['output']>;
  /** Unix timestamp (seconds) when the access token expires */
  expires_at?: Maybe<Scalars['BigInt']['output']>;
  /** e.g., 'Bearer' */
  token_type?: Maybe<Scalars['String']['output']>;
  /** The specific scopes (permissions) granted for this provider connection (e.g., gmail.modify, calendar.events) */
  scope?: Maybe<Scalars['String']['output']>;
  /** The ID Token from OAuth (JWT), if provided by the provider */
  id_token?: Maybe<Scalars['String']['output']>;
  /** For OAuth 2.0 state management */
  session_state?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['Timestamp']['output']>;
  updated_at?: Maybe<Scalars['Timestamp']['output']>;
  users?: Maybe<Array<Maybe<users>>>;
};


export type accountsusersArgs = {
  where?: InputMaybe<users_WhereInput>;
  orderBy?: InputMaybe<users_OrderByInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type users = {
  /** Unique user ID (UUID) generated by NextAuth.js for your application's internal use */
  id: Scalars['String']['output'];
  /** User's display name, typically from the OAuth provider (e.g., Google) */
  name?: Maybe<Scalars['String']['output']>;
  /** User's primary email address, typically from the OAuth provider (e.g., Google) */
  email: Scalars['String']['output'];
  /** Timestamp when the email was verified (e.g., via OAuth login) */
  email_verified?: Maybe<Scalars['DateTime']['output']>;
  /** URL to user's profile picture from the OAuth provider */
  image?: Maybe<Scalars['String']['output']>;
  /** Timestamp when the user record was created */
  created_at?: Maybe<Scalars['Timestamp']['output']>;
  /** Timestamp when the user record was last updated */
  updated_at?: Maybe<Scalars['Timestamp']['output']>;
  /** Last time user data was polled for new emails/events */
  last_synced_at?: Maybe<Scalars['DateTime']['output']>;
  accounts?: Maybe<Array<Maybe<accounts>>>;
  sessions?: Maybe<Array<Maybe<sessions>>>;
  user_calendar_events?: Maybe<Array<Maybe<user_calendar_events>>>;
  user_emails?: Maybe<Array<Maybe<user_emails>>>;
};


export type usersaccountsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<accounts_WhereInput>;
  orderBy?: InputMaybe<accounts_OrderByInput>;
};


export type userssessionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<sessions_WhereInput>;
  orderBy?: InputMaybe<sessions_OrderByInput>;
};


export type usersuser_calendar_eventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<user_calendar_events_WhereInput>;
  orderBy?: InputMaybe<user_calendar_events_OrderByInput>;
};


export type usersuser_emailsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<user_emails_WhereInput>;
  orderBy?: InputMaybe<user_emails_OrderByInput>;
};

export type accounts_WhereInput = {
  /** Unique ID for this specific account link (UUID) */
  id?: InputMaybe<Scalars['String']['input']>;
  /** Foreign key linking to the users table */
  user_id?: InputMaybe<Scalars['String']['input']>;
  /** Type of account (e.g., 'oauth', 'email', 'credentials') */
  type?: InputMaybe<Scalars['String']['input']>;
  /** The OAuth provider name (e.g., 'google', 'azure-ad') */
  provider?: InputMaybe<Scalars['String']['input']>;
  /** The unique ID of the user from the OAuth provider (e.g., Google's internal user ID) */
  provider_account_id?: InputMaybe<Scalars['String']['input']>;
  /** Encrypted refresh token from the OAuth provider, used to get new access tokens */
  refresh_token?: InputMaybe<Scalars['String']['input']>;
  /** Encrypted access token from the OAuth provider, used for API calls */
  access_token?: InputMaybe<Scalars['String']['input']>;
  /** Unix timestamp (seconds) when the access token expires */
  expires_at?: InputMaybe<Scalars['String']['input']>;
  /** e.g., 'Bearer' */
  token_type?: InputMaybe<Scalars['String']['input']>;
  /** The specific scopes (permissions) granted for this provider connection (e.g., gmail.modify, calendar.events) */
  scope?: InputMaybe<Scalars['String']['input']>;
  /** The ID Token from OAuth (JWT), if provided by the provider */
  id_token?: InputMaybe<Scalars['String']['input']>;
  /** For OAuth 2.0 state management */
  session_state?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['String']['input']>;
};

export type accounts_OrderByInput = {
  /** Unique ID for this specific account link (UUID) */
  id?: InputMaybe<OrderBy>;
  /** Foreign key linking to the users table */
  user_id?: InputMaybe<OrderBy>;
  /** Type of account (e.g., 'oauth', 'email', 'credentials') */
  type?: InputMaybe<OrderBy>;
  /** The OAuth provider name (e.g., 'google', 'azure-ad') */
  provider?: InputMaybe<OrderBy>;
  /** The unique ID of the user from the OAuth provider (e.g., Google's internal user ID) */
  provider_account_id?: InputMaybe<OrderBy>;
  /** Encrypted refresh token from the OAuth provider, used to get new access tokens */
  refresh_token?: InputMaybe<OrderBy>;
  /** Encrypted access token from the OAuth provider, used for API calls */
  access_token?: InputMaybe<OrderBy>;
  /** Unix timestamp (seconds) when the access token expires */
  expires_at?: InputMaybe<OrderBy>;
  /** e.g., 'Bearer' */
  token_type?: InputMaybe<OrderBy>;
  /** The specific scopes (permissions) granted for this provider connection (e.g., gmail.modify, calendar.events) */
  scope?: InputMaybe<OrderBy>;
  /** The ID Token from OAuth (JWT), if provided by the provider */
  id_token?: InputMaybe<OrderBy>;
  /** For OAuth 2.0 state management */
  session_state?: InputMaybe<OrderBy>;
  created_at?: InputMaybe<OrderBy>;
  updated_at?: InputMaybe<OrderBy>;
};

export type OrderBy =
  | 'asc'
  | 'desc';

export type sessions = {
  /** Unique ID for the session record (UUID) */
  id: Scalars['String']['output'];
  /** The unique token used to identify the session */
  session_token: Scalars['String']['output'];
  /** Foreign key linking to the users table */
  user_id: Scalars['String']['output'];
  /** Timestamp when the session expires */
  expires: Scalars['DateTime']['output'];
  created_at?: Maybe<Scalars['Timestamp']['output']>;
  updated_at?: Maybe<Scalars['Timestamp']['output']>;
  users?: Maybe<Array<Maybe<users>>>;
};


export type sessionsusersArgs = {
  where?: InputMaybe<users_WhereInput>;
  orderBy?: InputMaybe<users_OrderByInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type users_WhereInput = {
  /** Unique user ID (UUID) generated by NextAuth.js for your application's internal use */
  id?: InputMaybe<Scalars['String']['input']>;
  /** User's display name, typically from the OAuth provider (e.g., Google) */
  name?: InputMaybe<Scalars['String']['input']>;
  /** User's primary email address, typically from the OAuth provider (e.g., Google) */
  email?: InputMaybe<Scalars['String']['input']>;
  /** Timestamp when the email was verified (e.g., via OAuth login) */
  email_verified?: InputMaybe<Scalars['String']['input']>;
  /** URL to user's profile picture from the OAuth provider */
  image?: InputMaybe<Scalars['String']['input']>;
  /** Timestamp when the user record was created */
  created_at?: InputMaybe<Scalars['String']['input']>;
  /** Timestamp when the user record was last updated */
  updated_at?: InputMaybe<Scalars['String']['input']>;
  /** Last time user data was polled for new emails/events */
  last_synced_at?: InputMaybe<Scalars['String']['input']>;
};

export type users_OrderByInput = {
  /** Unique user ID (UUID) generated by NextAuth.js for your application's internal use */
  id?: InputMaybe<OrderBy>;
  /** User's display name, typically from the OAuth provider (e.g., Google) */
  name?: InputMaybe<OrderBy>;
  /** User's primary email address, typically from the OAuth provider (e.g., Google) */
  email?: InputMaybe<OrderBy>;
  /** Timestamp when the email was verified (e.g., via OAuth login) */
  email_verified?: InputMaybe<OrderBy>;
  /** URL to user's profile picture from the OAuth provider */
  image?: InputMaybe<OrderBy>;
  /** Timestamp when the user record was created */
  created_at?: InputMaybe<OrderBy>;
  /** Timestamp when the user record was last updated */
  updated_at?: InputMaybe<OrderBy>;
  /** Last time user data was polled for new emails/events */
  last_synced_at?: InputMaybe<OrderBy>;
};

export type sessions_WhereInput = {
  /** Unique ID for the session record (UUID) */
  id?: InputMaybe<Scalars['String']['input']>;
  /** The unique token used to identify the session */
  session_token?: InputMaybe<Scalars['String']['input']>;
  /** Foreign key linking to the users table */
  user_id?: InputMaybe<Scalars['String']['input']>;
  /** Timestamp when the session expires */
  expires?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['String']['input']>;
};

export type sessions_OrderByInput = {
  /** Unique ID for the session record (UUID) */
  id?: InputMaybe<OrderBy>;
  /** The unique token used to identify the session */
  session_token?: InputMaybe<OrderBy>;
  /** Foreign key linking to the users table */
  user_id?: InputMaybe<OrderBy>;
  /** Timestamp when the session expires */
  expires?: InputMaybe<OrderBy>;
  created_at?: InputMaybe<OrderBy>;
  updated_at?: InputMaybe<OrderBy>;
};

export type user_calendar_events = {
  /** Your internal unique ID for the event (UUID) */
  id: Scalars['String']['output'];
  /** Foreign key linking to the users table */
  user_id: Scalars['String']['output'];
  /** The event's ID from Google/Outlook */
  provider_event_id: Scalars['String']['output'];
  /** The ID of the calendar it belongs to */
  calendar_id: Scalars['String']['output'];
  /** Event title/summary */
  summary?: Maybe<Scalars['String']['output']>;
  /** Event description */
  description?: Maybe<Scalars['String']['output']>;
  /** Event start time */
  start_time: Scalars['DateTime']['output'];
  /** Event end time */
  end_time: Scalars['DateTime']['output'];
  /** Event location */
  location?: Maybe<Scalars['String']['output']>;
  /** JSON array of attendee emails and their response statuses */
  attendees?: Maybe<Scalars['JSON']['output']>;
  /** Event status */
  status: user_calendar_events_status;
  /** Link to the event in the provider's calendar (e.g., Google Calendar HTML link) */
  html_link?: Maybe<Scalars['String']['output']>;
  /** Timestamp when your system ingested this event */
  ingested_at?: Maybe<Scalars['Timestamp']['output']>;
  created_at?: Maybe<Scalars['Timestamp']['output']>;
  updated_at?: Maybe<Scalars['Timestamp']['output']>;
  users?: Maybe<Array<Maybe<users>>>;
};


export type user_calendar_eventsusersArgs = {
  where?: InputMaybe<users_WhereInput>;
  orderBy?: InputMaybe<users_OrderByInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type user_calendar_events_status =
  | 'confirmed'
  | 'tentative'
  | 'cancelled';

export type user_calendar_events_WhereInput = {
  /** Your internal unique ID for the event (UUID) */
  id?: InputMaybe<Scalars['String']['input']>;
  /** Foreign key linking to the users table */
  user_id?: InputMaybe<Scalars['String']['input']>;
  /** The event's ID from Google/Outlook */
  provider_event_id?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the calendar it belongs to */
  calendar_id?: InputMaybe<Scalars['String']['input']>;
  /** Event title/summary */
  summary?: InputMaybe<Scalars['String']['input']>;
  /** Event description */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Event start time */
  start_time?: InputMaybe<Scalars['String']['input']>;
  /** Event end time */
  end_time?: InputMaybe<Scalars['String']['input']>;
  /** Event location */
  location?: InputMaybe<Scalars['String']['input']>;
  /** JSON array of attendee emails and their response statuses */
  attendees?: InputMaybe<Scalars['String']['input']>;
  /** Event status */
  status?: InputMaybe<Scalars['String']['input']>;
  /** Link to the event in the provider's calendar (e.g., Google Calendar HTML link) */
  html_link?: InputMaybe<Scalars['String']['input']>;
  /** Timestamp when your system ingested this event */
  ingested_at?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['String']['input']>;
};

export type user_calendar_events_OrderByInput = {
  /** Your internal unique ID for the event (UUID) */
  id?: InputMaybe<OrderBy>;
  /** Foreign key linking to the users table */
  user_id?: InputMaybe<OrderBy>;
  /** The event's ID from Google/Outlook */
  provider_event_id?: InputMaybe<OrderBy>;
  /** The ID of the calendar it belongs to */
  calendar_id?: InputMaybe<OrderBy>;
  /** Event title/summary */
  summary?: InputMaybe<OrderBy>;
  /** Event description */
  description?: InputMaybe<OrderBy>;
  /** Event start time */
  start_time?: InputMaybe<OrderBy>;
  /** Event end time */
  end_time?: InputMaybe<OrderBy>;
  /** Event location */
  location?: InputMaybe<OrderBy>;
  /** JSON array of attendee emails and their response statuses */
  attendees?: InputMaybe<OrderBy>;
  /** Event status */
  status?: InputMaybe<OrderBy>;
  /** Link to the event in the provider's calendar (e.g., Google Calendar HTML link) */
  html_link?: InputMaybe<OrderBy>;
  /** Timestamp when your system ingested this event */
  ingested_at?: InputMaybe<OrderBy>;
  created_at?: InputMaybe<OrderBy>;
  updated_at?: InputMaybe<OrderBy>;
};

export type user_emails = {
  /** Your internal unique ID for the email (UUID) */
  id: Scalars['String']['output'];
  /** Foreign key linking to the users table */
  user_id: Scalars['String']['output'];
  /** The email's ID from Google/Outlook (e.g., Gmail's message ID) */
  provider_email_id: Scalars['String']['output'];
  /** The thread ID from the provider */
  thread_id?: Maybe<Scalars['String']['output']>;
  /** Sender's email address */
  from_email?: Maybe<Scalars['String']['output']>;
  /** JSON array of recipient email addresses */
  to_emails?: Maybe<Scalars['JSON']['output']>;
  /** JSON array of CC recipient email addresses */
  cc_emails?: Maybe<Scalars['JSON']['output']>;
  /** JSON array of BCC recipient email addresses */
  bcc_emails?: Maybe<Scalars['JSON']['output']>;
  /** Email subject line */
  subject?: Maybe<Scalars['String']['output']>;
  /** A short preview/snippet of the email body */
  snippet?: Maybe<Scalars['String']['output']>;
  /** The internal date/time from the email provider */
  internal_date?: Maybe<Scalars['DateTime']['output']>;
  /** Timestamp when your system ingested this email */
  received_at?: Maybe<Scalars['Timestamp']['output']>;
  /** Whether the email is marked as read */
  is_read?: Maybe<Scalars['Int']['output']>;
  /** JSON array of label IDs (e.g., 'INBOX', 'SENT', 'STARRED') */
  label_ids?: Maybe<Scalars['JSON']['output']>;
  /** Current status of the email in the mailbox */
  status?: Maybe<user_emails_status>;
  /** SHA256 hash of the full email body to detect changes (optional) */
  raw_body_hash?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['Timestamp']['output']>;
  updated_at?: Maybe<Scalars['Timestamp']['output']>;
  users?: Maybe<Array<Maybe<users>>>;
};


export type user_emailsusersArgs = {
  where?: InputMaybe<users_WhereInput>;
  orderBy?: InputMaybe<users_OrderByInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type user_emails_status =
  | 'active'
  | 'archived'
  | 'trashed'
  | 'deleted';

export type user_emails_WhereInput = {
  /** Your internal unique ID for the email (UUID) */
  id?: InputMaybe<Scalars['String']['input']>;
  /** Foreign key linking to the users table */
  user_id?: InputMaybe<Scalars['String']['input']>;
  /** The email's ID from Google/Outlook (e.g., Gmail's message ID) */
  provider_email_id?: InputMaybe<Scalars['String']['input']>;
  /** The thread ID from the provider */
  thread_id?: InputMaybe<Scalars['String']['input']>;
  /** Sender's email address */
  from_email?: InputMaybe<Scalars['String']['input']>;
  /** JSON array of recipient email addresses */
  to_emails?: InputMaybe<Scalars['String']['input']>;
  /** JSON array of CC recipient email addresses */
  cc_emails?: InputMaybe<Scalars['String']['input']>;
  /** JSON array of BCC recipient email addresses */
  bcc_emails?: InputMaybe<Scalars['String']['input']>;
  /** Email subject line */
  subject?: InputMaybe<Scalars['String']['input']>;
  /** A short preview/snippet of the email body */
  snippet?: InputMaybe<Scalars['String']['input']>;
  /** The internal date/time from the email provider */
  internal_date?: InputMaybe<Scalars['String']['input']>;
  /** Timestamp when your system ingested this email */
  received_at?: InputMaybe<Scalars['String']['input']>;
  /** Whether the email is marked as read */
  is_read?: InputMaybe<Scalars['String']['input']>;
  /** JSON array of label IDs (e.g., 'INBOX', 'SENT', 'STARRED') */
  label_ids?: InputMaybe<Scalars['String']['input']>;
  /** Current status of the email in the mailbox */
  status?: InputMaybe<Scalars['String']['input']>;
  /** SHA256 hash of the full email body to detect changes (optional) */
  raw_body_hash?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['String']['input']>;
};

export type user_emails_OrderByInput = {
  /** Your internal unique ID for the email (UUID) */
  id?: InputMaybe<OrderBy>;
  /** Foreign key linking to the users table */
  user_id?: InputMaybe<OrderBy>;
  /** The email's ID from Google/Outlook (e.g., Gmail's message ID) */
  provider_email_id?: InputMaybe<OrderBy>;
  /** The thread ID from the provider */
  thread_id?: InputMaybe<OrderBy>;
  /** Sender's email address */
  from_email?: InputMaybe<OrderBy>;
  /** JSON array of recipient email addresses */
  to_emails?: InputMaybe<OrderBy>;
  /** JSON array of CC recipient email addresses */
  cc_emails?: InputMaybe<OrderBy>;
  /** JSON array of BCC recipient email addresses */
  bcc_emails?: InputMaybe<OrderBy>;
  /** Email subject line */
  subject?: InputMaybe<OrderBy>;
  /** A short preview/snippet of the email body */
  snippet?: InputMaybe<OrderBy>;
  /** The internal date/time from the email provider */
  internal_date?: InputMaybe<OrderBy>;
  /** Timestamp when your system ingested this email */
  received_at?: InputMaybe<OrderBy>;
  /** Whether the email is marked as read */
  is_read?: InputMaybe<OrderBy>;
  /** JSON array of label IDs (e.g., 'INBOX', 'SENT', 'STARRED') */
  label_ids?: InputMaybe<OrderBy>;
  /** Current status of the email in the mailbox */
  status?: InputMaybe<OrderBy>;
  /** SHA256 hash of the full email body to detect changes (optional) */
  raw_body_hash?: InputMaybe<OrderBy>;
  created_at?: InputMaybe<OrderBy>;
  updated_at?: InputMaybe<OrderBy>;
};

export type Mutation = {
  insert_accounts?: Maybe<accounts>;
  update_accounts?: Maybe<accounts>;
  delete_accounts?: Maybe<Scalars['Boolean']['output']>;
  insert_sessions?: Maybe<sessions>;
  update_sessions?: Maybe<sessions>;
  delete_sessions?: Maybe<Scalars['Boolean']['output']>;
  insert_user_calendar_events?: Maybe<user_calendar_events>;
  update_user_calendar_events?: Maybe<user_calendar_events>;
  delete_user_calendar_events?: Maybe<Scalars['Boolean']['output']>;
  insert_user_emails?: Maybe<user_emails>;
  update_user_emails?: Maybe<user_emails>;
  delete_user_emails?: Maybe<Scalars['Boolean']['output']>;
  insert_users?: Maybe<users>;
  update_users?: Maybe<users>;
  delete_users?: Maybe<Scalars['Boolean']['output']>;
};


export type Mutationinsert_accountsArgs = {
  accounts: accounts_InsertInput;
};


export type Mutationupdate_accountsArgs = {
  accounts: accounts_UpdateInput;
  where?: InputMaybe<accounts_WhereInput>;
};


export type Mutationdelete_accountsArgs = {
  where?: InputMaybe<accounts_WhereInput>;
};


export type Mutationinsert_sessionsArgs = {
  sessions: sessions_InsertInput;
};


export type Mutationupdate_sessionsArgs = {
  sessions: sessions_UpdateInput;
  where?: InputMaybe<sessions_WhereInput>;
};


export type Mutationdelete_sessionsArgs = {
  where?: InputMaybe<sessions_WhereInput>;
};


export type Mutationinsert_user_calendar_eventsArgs = {
  user_calendar_events: user_calendar_events_InsertInput;
};


export type Mutationupdate_user_calendar_eventsArgs = {
  user_calendar_events: user_calendar_events_UpdateInput;
  where?: InputMaybe<user_calendar_events_WhereInput>;
};


export type Mutationdelete_user_calendar_eventsArgs = {
  where?: InputMaybe<user_calendar_events_WhereInput>;
};


export type Mutationinsert_user_emailsArgs = {
  user_emails: user_emails_InsertInput;
};


export type Mutationupdate_user_emailsArgs = {
  user_emails: user_emails_UpdateInput;
  where?: InputMaybe<user_emails_WhereInput>;
};


export type Mutationdelete_user_emailsArgs = {
  where?: InputMaybe<user_emails_WhereInput>;
};


export type Mutationinsert_usersArgs = {
  users: users_InsertInput;
};


export type Mutationupdate_usersArgs = {
  users: users_UpdateInput;
  where?: InputMaybe<users_WhereInput>;
};


export type Mutationdelete_usersArgs = {
  where?: InputMaybe<users_WhereInput>;
};

export type accounts_InsertInput = {
  /** Unique ID for this specific account link (UUID) */
  id: Scalars['String']['input'];
  /** Foreign key linking to the users table */
  user_id: Scalars['String']['input'];
  /** Type of account (e.g., 'oauth', 'email', 'credentials') */
  type: Scalars['String']['input'];
  /** The OAuth provider name (e.g., 'google', 'azure-ad') */
  provider: Scalars['String']['input'];
  /** The unique ID of the user from the OAuth provider (e.g., Google's internal user ID) */
  provider_account_id: Scalars['String']['input'];
  /** Encrypted refresh token from the OAuth provider, used to get new access tokens */
  refresh_token?: InputMaybe<Scalars['String']['input']>;
  /** Encrypted access token from the OAuth provider, used for API calls */
  access_token?: InputMaybe<Scalars['String']['input']>;
  /** Unix timestamp (seconds) when the access token expires */
  expires_at?: InputMaybe<Scalars['BigInt']['input']>;
  /** e.g., 'Bearer' */
  token_type?: InputMaybe<Scalars['String']['input']>;
  /** The specific scopes (permissions) granted for this provider connection (e.g., gmail.modify, calendar.events) */
  scope?: InputMaybe<Scalars['String']['input']>;
  /** The ID Token from OAuth (JWT), if provided by the provider */
  id_token?: InputMaybe<Scalars['String']['input']>;
  /** For OAuth 2.0 state management */
  session_state?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['Timestamp']['input']>;
  updated_at?: InputMaybe<Scalars['Timestamp']['input']>;
};

export type accounts_UpdateInput = {
  /** Unique ID for this specific account link (UUID) */
  id?: InputMaybe<Scalars['String']['input']>;
  /** Foreign key linking to the users table */
  user_id?: InputMaybe<Scalars['String']['input']>;
  /** Type of account (e.g., 'oauth', 'email', 'credentials') */
  type?: InputMaybe<Scalars['String']['input']>;
  /** The OAuth provider name (e.g., 'google', 'azure-ad') */
  provider?: InputMaybe<Scalars['String']['input']>;
  /** The unique ID of the user from the OAuth provider (e.g., Google's internal user ID) */
  provider_account_id?: InputMaybe<Scalars['String']['input']>;
  /** Encrypted refresh token from the OAuth provider, used to get new access tokens */
  refresh_token?: InputMaybe<Scalars['String']['input']>;
  /** Encrypted access token from the OAuth provider, used for API calls */
  access_token?: InputMaybe<Scalars['String']['input']>;
  /** Unix timestamp (seconds) when the access token expires */
  expires_at?: InputMaybe<Scalars['BigInt']['input']>;
  /** e.g., 'Bearer' */
  token_type?: InputMaybe<Scalars['String']['input']>;
  /** The specific scopes (permissions) granted for this provider connection (e.g., gmail.modify, calendar.events) */
  scope?: InputMaybe<Scalars['String']['input']>;
  /** The ID Token from OAuth (JWT), if provided by the provider */
  id_token?: InputMaybe<Scalars['String']['input']>;
  /** For OAuth 2.0 state management */
  session_state?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['Timestamp']['input']>;
  updated_at?: InputMaybe<Scalars['Timestamp']['input']>;
};

export type sessions_InsertInput = {
  /** Unique ID for the session record (UUID) */
  id: Scalars['String']['input'];
  /** The unique token used to identify the session */
  session_token: Scalars['String']['input'];
  /** Foreign key linking to the users table */
  user_id: Scalars['String']['input'];
  /** Timestamp when the session expires */
  expires: Scalars['DateTime']['input'];
  created_at?: InputMaybe<Scalars['Timestamp']['input']>;
  updated_at?: InputMaybe<Scalars['Timestamp']['input']>;
};

export type sessions_UpdateInput = {
  /** Unique ID for the session record (UUID) */
  id?: InputMaybe<Scalars['String']['input']>;
  /** The unique token used to identify the session */
  session_token?: InputMaybe<Scalars['String']['input']>;
  /** Foreign key linking to the users table */
  user_id?: InputMaybe<Scalars['String']['input']>;
  /** Timestamp when the session expires */
  expires?: InputMaybe<Scalars['DateTime']['input']>;
  created_at?: InputMaybe<Scalars['Timestamp']['input']>;
  updated_at?: InputMaybe<Scalars['Timestamp']['input']>;
};

export type user_calendar_events_InsertInput = {
  /** Your internal unique ID for the event (UUID) */
  id: Scalars['String']['input'];
  /** Foreign key linking to the users table */
  user_id: Scalars['String']['input'];
  /** The event's ID from Google/Outlook */
  provider_event_id: Scalars['String']['input'];
  /** The ID of the calendar it belongs to */
  calendar_id: Scalars['String']['input'];
  /** Event title/summary */
  summary?: InputMaybe<Scalars['String']['input']>;
  /** Event description */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Event start time */
  start_time: Scalars['DateTime']['input'];
  /** Event end time */
  end_time: Scalars['DateTime']['input'];
  /** Event location */
  location?: InputMaybe<Scalars['String']['input']>;
  /** JSON array of attendee emails and their response statuses */
  attendees?: InputMaybe<Scalars['JSON']['input']>;
  /** Event status */
  status: user_calendar_events_status;
  /** Link to the event in the provider's calendar (e.g., Google Calendar HTML link) */
  html_link?: InputMaybe<Scalars['String']['input']>;
  /** Timestamp when your system ingested this event */
  ingested_at?: InputMaybe<Scalars['Timestamp']['input']>;
  created_at?: InputMaybe<Scalars['Timestamp']['input']>;
  updated_at?: InputMaybe<Scalars['Timestamp']['input']>;
};

export type user_calendar_events_UpdateInput = {
  /** Your internal unique ID for the event (UUID) */
  id?: InputMaybe<Scalars['String']['input']>;
  /** Foreign key linking to the users table */
  user_id?: InputMaybe<Scalars['String']['input']>;
  /** The event's ID from Google/Outlook */
  provider_event_id?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the calendar it belongs to */
  calendar_id?: InputMaybe<Scalars['String']['input']>;
  /** Event title/summary */
  summary?: InputMaybe<Scalars['String']['input']>;
  /** Event description */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Event start time */
  start_time?: InputMaybe<Scalars['DateTime']['input']>;
  /** Event end time */
  end_time?: InputMaybe<Scalars['DateTime']['input']>;
  /** Event location */
  location?: InputMaybe<Scalars['String']['input']>;
  /** JSON array of attendee emails and their response statuses */
  attendees?: InputMaybe<Scalars['JSON']['input']>;
  /** Event status */
  status?: InputMaybe<user_calendar_events_status>;
  /** Link to the event in the provider's calendar (e.g., Google Calendar HTML link) */
  html_link?: InputMaybe<Scalars['String']['input']>;
  /** Timestamp when your system ingested this event */
  ingested_at?: InputMaybe<Scalars['Timestamp']['input']>;
  created_at?: InputMaybe<Scalars['Timestamp']['input']>;
  updated_at?: InputMaybe<Scalars['Timestamp']['input']>;
};

export type user_emails_InsertInput = {
  /** Your internal unique ID for the email (UUID) */
  id: Scalars['String']['input'];
  /** Foreign key linking to the users table */
  user_id: Scalars['String']['input'];
  /** The email's ID from Google/Outlook (e.g., Gmail's message ID) */
  provider_email_id: Scalars['String']['input'];
  /** The thread ID from the provider */
  thread_id?: InputMaybe<Scalars['String']['input']>;
  /** Sender's email address */
  from_email?: InputMaybe<Scalars['String']['input']>;
  /** JSON array of recipient email addresses */
  to_emails?: InputMaybe<Scalars['JSON']['input']>;
  /** JSON array of CC recipient email addresses */
  cc_emails?: InputMaybe<Scalars['JSON']['input']>;
  /** JSON array of BCC recipient email addresses */
  bcc_emails?: InputMaybe<Scalars['JSON']['input']>;
  /** Email subject line */
  subject?: InputMaybe<Scalars['String']['input']>;
  /** A short preview/snippet of the email body */
  snippet?: InputMaybe<Scalars['String']['input']>;
  /** The internal date/time from the email provider */
  internal_date?: InputMaybe<Scalars['DateTime']['input']>;
  /** Timestamp when your system ingested this email */
  received_at?: InputMaybe<Scalars['Timestamp']['input']>;
  /** Whether the email is marked as read */
  is_read?: InputMaybe<Scalars['Int']['input']>;
  /** JSON array of label IDs (e.g., 'INBOX', 'SENT', 'STARRED') */
  label_ids?: InputMaybe<Scalars['JSON']['input']>;
  /** Current status of the email in the mailbox */
  status?: InputMaybe<user_emails_status>;
  /** SHA256 hash of the full email body to detect changes (optional) */
  raw_body_hash?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['Timestamp']['input']>;
  updated_at?: InputMaybe<Scalars['Timestamp']['input']>;
};

export type user_emails_UpdateInput = {
  /** Your internal unique ID for the email (UUID) */
  id?: InputMaybe<Scalars['String']['input']>;
  /** Foreign key linking to the users table */
  user_id?: InputMaybe<Scalars['String']['input']>;
  /** The email's ID from Google/Outlook (e.g., Gmail's message ID) */
  provider_email_id?: InputMaybe<Scalars['String']['input']>;
  /** The thread ID from the provider */
  thread_id?: InputMaybe<Scalars['String']['input']>;
  /** Sender's email address */
  from_email?: InputMaybe<Scalars['String']['input']>;
  /** JSON array of recipient email addresses */
  to_emails?: InputMaybe<Scalars['JSON']['input']>;
  /** JSON array of CC recipient email addresses */
  cc_emails?: InputMaybe<Scalars['JSON']['input']>;
  /** JSON array of BCC recipient email addresses */
  bcc_emails?: InputMaybe<Scalars['JSON']['input']>;
  /** Email subject line */
  subject?: InputMaybe<Scalars['String']['input']>;
  /** A short preview/snippet of the email body */
  snippet?: InputMaybe<Scalars['String']['input']>;
  /** The internal date/time from the email provider */
  internal_date?: InputMaybe<Scalars['DateTime']['input']>;
  /** Timestamp when your system ingested this email */
  received_at?: InputMaybe<Scalars['Timestamp']['input']>;
  /** Whether the email is marked as read */
  is_read?: InputMaybe<Scalars['Int']['input']>;
  /** JSON array of label IDs (e.g., 'INBOX', 'SENT', 'STARRED') */
  label_ids?: InputMaybe<Scalars['JSON']['input']>;
  /** Current status of the email in the mailbox */
  status?: InputMaybe<user_emails_status>;
  /** SHA256 hash of the full email body to detect changes (optional) */
  raw_body_hash?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['Timestamp']['input']>;
  updated_at?: InputMaybe<Scalars['Timestamp']['input']>;
};

export type users_InsertInput = {
  /** Unique user ID (UUID) generated by NextAuth.js for your application's internal use */
  id: Scalars['String']['input'];
  /** User's display name, typically from the OAuth provider (e.g., Google) */
  name?: InputMaybe<Scalars['String']['input']>;
  /** User's primary email address, typically from the OAuth provider (e.g., Google) */
  email: Scalars['String']['input'];
  /** Timestamp when the email was verified (e.g., via OAuth login) */
  email_verified?: InputMaybe<Scalars['DateTime']['input']>;
  /** URL to user's profile picture from the OAuth provider */
  image?: InputMaybe<Scalars['String']['input']>;
  /** Timestamp when the user record was created */
  created_at?: InputMaybe<Scalars['Timestamp']['input']>;
  /** Timestamp when the user record was last updated */
  updated_at?: InputMaybe<Scalars['Timestamp']['input']>;
  /** Last time user data was polled for new emails/events */
  last_synced_at?: InputMaybe<Scalars['DateTime']['input']>;
};

export type users_UpdateInput = {
  /** Unique user ID (UUID) generated by NextAuth.js for your application's internal use */
  id?: InputMaybe<Scalars['String']['input']>;
  /** User's display name, typically from the OAuth provider (e.g., Google) */
  name?: InputMaybe<Scalars['String']['input']>;
  /** User's primary email address, typically from the OAuth provider (e.g., Google) */
  email?: InputMaybe<Scalars['String']['input']>;
  /** Timestamp when the email was verified (e.g., via OAuth login) */
  email_verified?: InputMaybe<Scalars['DateTime']['input']>;
  /** URL to user's profile picture from the OAuth provider */
  image?: InputMaybe<Scalars['String']['input']>;
  /** Timestamp when the user record was created */
  created_at?: InputMaybe<Scalars['Timestamp']['input']>;
  /** Timestamp when the user record was last updated */
  updated_at?: InputMaybe<Scalars['Timestamp']['input']>;
  /** Last time user data was polled for new emails/events */
  last_synced_at?: InputMaybe<Scalars['DateTime']['input']>;
};

  export type QuerySdk = {
      /** undefined **/
  accounts: InContextSdkMethod<Query['accounts'], QueryaccountsArgs, MeshContext>,
  /** undefined **/
  count_accounts: InContextSdkMethod<Query['count_accounts'], Querycount_accountsArgs, MeshContext>,
  /** undefined **/
  sessions: InContextSdkMethod<Query['sessions'], QuerysessionsArgs, MeshContext>,
  /** undefined **/
  count_sessions: InContextSdkMethod<Query['count_sessions'], Querycount_sessionsArgs, MeshContext>,
  /** undefined **/
  user_calendar_events: InContextSdkMethod<Query['user_calendar_events'], Queryuser_calendar_eventsArgs, MeshContext>,
  /** undefined **/
  count_user_calendar_events: InContextSdkMethod<Query['count_user_calendar_events'], Querycount_user_calendar_eventsArgs, MeshContext>,
  /** undefined **/
  user_emails: InContextSdkMethod<Query['user_emails'], Queryuser_emailsArgs, MeshContext>,
  /** undefined **/
  count_user_emails: InContextSdkMethod<Query['count_user_emails'], Querycount_user_emailsArgs, MeshContext>,
  /** undefined **/
  users: InContextSdkMethod<Query['users'], QueryusersArgs, MeshContext>,
  /** undefined **/
  count_users: InContextSdkMethod<Query['count_users'], Querycount_usersArgs, MeshContext>
  };

  export type MutationSdk = {
      /** undefined **/
  insert_accounts: InContextSdkMethod<Mutation['insert_accounts'], Mutationinsert_accountsArgs, MeshContext>,
  /** undefined **/
  update_accounts: InContextSdkMethod<Mutation['update_accounts'], Mutationupdate_accountsArgs, MeshContext>,
  /** undefined **/
  delete_accounts: InContextSdkMethod<Mutation['delete_accounts'], Mutationdelete_accountsArgs, MeshContext>,
  /** undefined **/
  insert_sessions: InContextSdkMethod<Mutation['insert_sessions'], Mutationinsert_sessionsArgs, MeshContext>,
  /** undefined **/
  update_sessions: InContextSdkMethod<Mutation['update_sessions'], Mutationupdate_sessionsArgs, MeshContext>,
  /** undefined **/
  delete_sessions: InContextSdkMethod<Mutation['delete_sessions'], Mutationdelete_sessionsArgs, MeshContext>,
  /** undefined **/
  insert_user_calendar_events: InContextSdkMethod<Mutation['insert_user_calendar_events'], Mutationinsert_user_calendar_eventsArgs, MeshContext>,
  /** undefined **/
  update_user_calendar_events: InContextSdkMethod<Mutation['update_user_calendar_events'], Mutationupdate_user_calendar_eventsArgs, MeshContext>,
  /** undefined **/
  delete_user_calendar_events: InContextSdkMethod<Mutation['delete_user_calendar_events'], Mutationdelete_user_calendar_eventsArgs, MeshContext>,
  /** undefined **/
  insert_user_emails: InContextSdkMethod<Mutation['insert_user_emails'], Mutationinsert_user_emailsArgs, MeshContext>,
  /** undefined **/
  update_user_emails: InContextSdkMethod<Mutation['update_user_emails'], Mutationupdate_user_emailsArgs, MeshContext>,
  /** undefined **/
  delete_user_emails: InContextSdkMethod<Mutation['delete_user_emails'], Mutationdelete_user_emailsArgs, MeshContext>,
  /** undefined **/
  insert_users: InContextSdkMethod<Mutation['insert_users'], Mutationinsert_usersArgs, MeshContext>,
  /** undefined **/
  update_users: InContextSdkMethod<Mutation['update_users'], Mutationupdate_usersArgs, MeshContext>,
  /** undefined **/
  delete_users: InContextSdkMethod<Mutation['delete_users'], Mutationdelete_usersArgs, MeshContext>
  };

  export type SubscriptionSdk = {
    
  };

  export type Context = {
      ["MySQL"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
