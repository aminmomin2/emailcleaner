// @ts-nocheck
import { GraphQLResolveInfo, SelectionSetNode, FieldNode, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { findAndParseConfig } from '@graphql-mesh/cli';
import { createMeshHTTPHandler, MeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh, type ExecuteMeshFn, type SubscribeMeshFn, type MeshContext as BaseMeshContext, type MeshInstance } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import type { ImportFn } from '@graphql-mesh/types';
import type { MySqlTypes } from './sources/MySQL/types';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };



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
  cleanup_suggestions?: Maybe<Array<Maybe<cleanup_suggestions>>>;
  count_cleanup_suggestions?: Maybe<Scalars['Int']['output']>;
  sessions?: Maybe<Array<Maybe<sessions>>>;
  count_sessions?: Maybe<Scalars['Int']['output']>;
  user_calendar_events?: Maybe<Array<Maybe<user_calendar_events>>>;
  count_user_calendar_events?: Maybe<Scalars['Int']['output']>;
  user_emails?: Maybe<Array<Maybe<user_emails>>>;
  count_user_emails?: Maybe<Scalars['Int']['output']>;
  user_preferences?: Maybe<Array<Maybe<user_preferences>>>;
  count_user_preferences?: Maybe<Scalars['Int']['output']>;
  users?: Maybe<Array<Maybe<users>>>;
  count_users?: Maybe<Scalars['Int']['output']>;
  me?: Maybe<User>;
  userEmailsByUser: Array<UserEmail>;
  userCalendarEventsByUser: Array<UserCalendarEvent>;
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


export type Querycleanup_suggestionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<cleanup_suggestions_WhereInput>;
  orderBy?: InputMaybe<cleanup_suggestions_OrderByInput>;
};


export type Querycount_cleanup_suggestionsArgs = {
  where?: InputMaybe<cleanup_suggestions_WhereInput>;
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


export type Queryuser_preferencesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<user_preferences_WhereInput>;
  orderBy?: InputMaybe<user_preferences_OrderByInput>;
};


export type Querycount_user_preferencesArgs = {
  where?: InputMaybe<user_preferences_WhereInput>;
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


export type QueryuserEmailsByUserArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryuserCalendarEventsByUserArgs = {
  userId: Scalars['ID']['input'];
};

export type Mutation = {
  insert_accounts?: Maybe<accounts>;
  update_accounts?: Maybe<accounts>;
  delete_accounts?: Maybe<Scalars['Boolean']['output']>;
  insert_cleanup_suggestions?: Maybe<cleanup_suggestions>;
  update_cleanup_suggestions?: Maybe<cleanup_suggestions>;
  delete_cleanup_suggestions?: Maybe<Scalars['Boolean']['output']>;
  insert_sessions?: Maybe<sessions>;
  update_sessions?: Maybe<sessions>;
  delete_sessions?: Maybe<Scalars['Boolean']['output']>;
  insert_user_calendar_events?: Maybe<user_calendar_events>;
  update_user_calendar_events?: Maybe<user_calendar_events>;
  delete_user_calendar_events?: Maybe<Scalars['Boolean']['output']>;
  insert_user_emails?: Maybe<user_emails>;
  update_user_emails?: Maybe<user_emails>;
  delete_user_emails?: Maybe<Scalars['Boolean']['output']>;
  insert_user_preferences?: Maybe<user_preferences>;
  update_user_preferences?: Maybe<user_preferences>;
  delete_user_preferences?: Maybe<Scalars['Boolean']['output']>;
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


export type Mutationinsert_cleanup_suggestionsArgs = {
  cleanup_suggestions: cleanup_suggestions_InsertInput;
};


export type Mutationupdate_cleanup_suggestionsArgs = {
  cleanup_suggestions: cleanup_suggestions_UpdateInput;
  where?: InputMaybe<cleanup_suggestions_WhereInput>;
};


export type Mutationdelete_cleanup_suggestionsArgs = {
  where?: InputMaybe<cleanup_suggestions_WhereInput>;
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


export type Mutationinsert_user_preferencesArgs = {
  user_preferences: user_preferences_InsertInput;
};


export type Mutationupdate_user_preferencesArgs = {
  user_preferences: user_preferences_UpdateInput;
  where?: InputMaybe<user_preferences_WhereInput>;
};


export type Mutationdelete_user_preferencesArgs = {
  where?: InputMaybe<user_preferences_WhereInput>;
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
  has_synced?: Maybe<Scalars['Int']['output']>;
  accounts?: Maybe<Array<Maybe<accounts>>>;
  cleanup_suggestions?: Maybe<Array<Maybe<cleanup_suggestions>>>;
  sessions?: Maybe<Array<Maybe<sessions>>>;
  user_calendar_events?: Maybe<Array<Maybe<user_calendar_events>>>;
  user_emails?: Maybe<Array<Maybe<user_emails>>>;
  user_preferences?: Maybe<Array<Maybe<user_preferences>>>;
};


export type usersaccountsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<accounts_WhereInput>;
  orderBy?: InputMaybe<accounts_OrderByInput>;
};


export type userscleanup_suggestionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<cleanup_suggestions_WhereInput>;
  orderBy?: InputMaybe<cleanup_suggestions_OrderByInput>;
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


export type usersuser_preferencesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<user_preferences_WhereInput>;
  orderBy?: InputMaybe<user_preferences_OrderByInput>;
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

export type cleanup_suggestions = {
  /** Unique ID for the suggestion (UUID) */
  id: Scalars['String']['output'];
  /** Foreign key linking to the users table */
  user_id: Scalars['String']['output'];
  /** Foreign key linking to the user_emails table */
  email_id: Scalars['String']['output'];
  /** The email's ID from Google/Outlook */
  provider_email_id: Scalars['String']['output'];
  /** Sender's email address */
  from_email?: Maybe<Scalars['String']['output']>;
  /** Email subject line */
  subject?: Maybe<Scalars['String']['output']>;
  /** A short preview/snippet of the email body */
  snippet?: Maybe<Scalars['String']['output']>;
  /** Reason for the cleanup suggestion */
  reason: Scalars['String']['output'];
  /** Suggested cleanup action */
  suggested_action: cleanup_suggestions_suggested_action;
  /** Current status of the suggestion */
  status?: Maybe<cleanup_suggestions_status>;
  /** Timestamp when the suggestion was created */
  created_at?: Maybe<Scalars['Timestamp']['output']>;
  /** Timestamp when the suggestion was last updated */
  updated_at?: Maybe<Scalars['Timestamp']['output']>;
  user_emails?: Maybe<Array<Maybe<user_emails>>>;
  users?: Maybe<Array<Maybe<users>>>;
};


export type cleanup_suggestionsuser_emailsArgs = {
  where?: InputMaybe<user_emails_WhereInput>;
  orderBy?: InputMaybe<user_emails_OrderByInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type cleanup_suggestionsusersArgs = {
  where?: InputMaybe<users_WhereInput>;
  orderBy?: InputMaybe<users_OrderByInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type cleanup_suggestions_suggested_action =
  | 'archive'
  | 'trash'
  | 'delete_permanently';

export type cleanup_suggestions_status =
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'executed';

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
  cleanup_suggestions?: Maybe<Array<Maybe<cleanup_suggestions>>>;
  users?: Maybe<Array<Maybe<users>>>;
};


export type user_emailscleanup_suggestionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<cleanup_suggestions_WhereInput>;
  orderBy?: InputMaybe<cleanup_suggestions_OrderByInput>;
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

export type cleanup_suggestions_WhereInput = {
  /** Unique ID for the suggestion (UUID) */
  id?: InputMaybe<Scalars['String']['input']>;
  /** Foreign key linking to the users table */
  user_id?: InputMaybe<Scalars['String']['input']>;
  /** Foreign key linking to the user_emails table */
  email_id?: InputMaybe<Scalars['String']['input']>;
  /** The email's ID from Google/Outlook */
  provider_email_id?: InputMaybe<Scalars['String']['input']>;
  /** Sender's email address */
  from_email?: InputMaybe<Scalars['String']['input']>;
  /** Email subject line */
  subject?: InputMaybe<Scalars['String']['input']>;
  /** A short preview/snippet of the email body */
  snippet?: InputMaybe<Scalars['String']['input']>;
  /** Reason for the cleanup suggestion */
  reason?: InputMaybe<Scalars['String']['input']>;
  /** Suggested cleanup action */
  suggested_action?: InputMaybe<Scalars['String']['input']>;
  /** Current status of the suggestion */
  status?: InputMaybe<Scalars['String']['input']>;
  /** Timestamp when the suggestion was created */
  created_at?: InputMaybe<Scalars['String']['input']>;
  /** Timestamp when the suggestion was last updated */
  updated_at?: InputMaybe<Scalars['String']['input']>;
};

export type cleanup_suggestions_OrderByInput = {
  /** Unique ID for the suggestion (UUID) */
  id?: InputMaybe<OrderBy>;
  /** Foreign key linking to the users table */
  user_id?: InputMaybe<OrderBy>;
  /** Foreign key linking to the user_emails table */
  email_id?: InputMaybe<OrderBy>;
  /** The email's ID from Google/Outlook */
  provider_email_id?: InputMaybe<OrderBy>;
  /** Sender's email address */
  from_email?: InputMaybe<OrderBy>;
  /** Email subject line */
  subject?: InputMaybe<OrderBy>;
  /** A short preview/snippet of the email body */
  snippet?: InputMaybe<OrderBy>;
  /** Reason for the cleanup suggestion */
  reason?: InputMaybe<OrderBy>;
  /** Suggested cleanup action */
  suggested_action?: InputMaybe<OrderBy>;
  /** Current status of the suggestion */
  status?: InputMaybe<OrderBy>;
  /** Timestamp when the suggestion was created */
  created_at?: InputMaybe<OrderBy>;
  /** Timestamp when the suggestion was last updated */
  updated_at?: InputMaybe<OrderBy>;
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
  has_synced?: InputMaybe<Scalars['String']['input']>;
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
  has_synced?: InputMaybe<OrderBy>;
};

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

export type user_preferences = {
  /** Unique ID for the preference record (UUID) */
  id: Scalars['String']['output'];
  /** Foreign key linking to the users table */
  user_id: Scalars['String']['output'];
  /** Key for the specific preference (e.g., 'ai_tone', 'auto_summarize', 'email_unwanted_senders') */
  preference_key: Scalars['String']['output'];
  /** Value of the preference (e.g., 'professional', 'true', '15', '["spam.com", "newsletter.net"]') */
  preference_value?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['Timestamp']['output']>;
  updated_at?: Maybe<Scalars['Timestamp']['output']>;
  users?: Maybe<Array<Maybe<users>>>;
};


export type user_preferencesusersArgs = {
  where?: InputMaybe<users_WhereInput>;
  orderBy?: InputMaybe<users_OrderByInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type user_preferences_WhereInput = {
  /** Unique ID for the preference record (UUID) */
  id?: InputMaybe<Scalars['String']['input']>;
  /** Foreign key linking to the users table */
  user_id?: InputMaybe<Scalars['String']['input']>;
  /** Key for the specific preference (e.g., 'ai_tone', 'auto_summarize', 'email_unwanted_senders') */
  preference_key?: InputMaybe<Scalars['String']['input']>;
  /** Value of the preference (e.g., 'professional', 'true', '15', '["spam.com", "newsletter.net"]') */
  preference_value?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['String']['input']>;
};

export type user_preferences_OrderByInput = {
  /** Unique ID for the preference record (UUID) */
  id?: InputMaybe<OrderBy>;
  /** Foreign key linking to the users table */
  user_id?: InputMaybe<OrderBy>;
  /** Key for the specific preference (e.g., 'ai_tone', 'auto_summarize', 'email_unwanted_senders') */
  preference_key?: InputMaybe<OrderBy>;
  /** Value of the preference (e.g., 'professional', 'true', '15', '["spam.com", "newsletter.net"]') */
  preference_value?: InputMaybe<OrderBy>;
  created_at?: InputMaybe<OrderBy>;
  updated_at?: InputMaybe<OrderBy>;
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

export type cleanup_suggestions_InsertInput = {
  /** Unique ID for the suggestion (UUID) */
  id: Scalars['String']['input'];
  /** Foreign key linking to the users table */
  user_id: Scalars['String']['input'];
  /** Foreign key linking to the user_emails table */
  email_id: Scalars['String']['input'];
  /** The email's ID from Google/Outlook */
  provider_email_id: Scalars['String']['input'];
  /** Sender's email address */
  from_email?: InputMaybe<Scalars['String']['input']>;
  /** Email subject line */
  subject?: InputMaybe<Scalars['String']['input']>;
  /** A short preview/snippet of the email body */
  snippet?: InputMaybe<Scalars['String']['input']>;
  /** Reason for the cleanup suggestion */
  reason: Scalars['String']['input'];
  /** Suggested cleanup action */
  suggested_action: cleanup_suggestions_suggested_action;
  /** Current status of the suggestion */
  status?: InputMaybe<cleanup_suggestions_status>;
  /** Timestamp when the suggestion was created */
  created_at?: InputMaybe<Scalars['Timestamp']['input']>;
  /** Timestamp when the suggestion was last updated */
  updated_at?: InputMaybe<Scalars['Timestamp']['input']>;
};

export type cleanup_suggestions_UpdateInput = {
  /** Unique ID for the suggestion (UUID) */
  id?: InputMaybe<Scalars['String']['input']>;
  /** Foreign key linking to the users table */
  user_id?: InputMaybe<Scalars['String']['input']>;
  /** Foreign key linking to the user_emails table */
  email_id?: InputMaybe<Scalars['String']['input']>;
  /** The email's ID from Google/Outlook */
  provider_email_id?: InputMaybe<Scalars['String']['input']>;
  /** Sender's email address */
  from_email?: InputMaybe<Scalars['String']['input']>;
  /** Email subject line */
  subject?: InputMaybe<Scalars['String']['input']>;
  /** A short preview/snippet of the email body */
  snippet?: InputMaybe<Scalars['String']['input']>;
  /** Reason for the cleanup suggestion */
  reason?: InputMaybe<Scalars['String']['input']>;
  /** Suggested cleanup action */
  suggested_action?: InputMaybe<cleanup_suggestions_suggested_action>;
  /** Current status of the suggestion */
  status?: InputMaybe<cleanup_suggestions_status>;
  /** Timestamp when the suggestion was created */
  created_at?: InputMaybe<Scalars['Timestamp']['input']>;
  /** Timestamp when the suggestion was last updated */
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

export type user_preferences_InsertInput = {
  /** Unique ID for the preference record (UUID) */
  id: Scalars['String']['input'];
  /** Foreign key linking to the users table */
  user_id: Scalars['String']['input'];
  /** Key for the specific preference (e.g., 'ai_tone', 'auto_summarize', 'email_unwanted_senders') */
  preference_key: Scalars['String']['input'];
  /** Value of the preference (e.g., 'professional', 'true', '15', '["spam.com", "newsletter.net"]') */
  preference_value?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['Timestamp']['input']>;
  updated_at?: InputMaybe<Scalars['Timestamp']['input']>;
};

export type user_preferences_UpdateInput = {
  /** Unique ID for the preference record (UUID) */
  id?: InputMaybe<Scalars['String']['input']>;
  /** Foreign key linking to the users table */
  user_id?: InputMaybe<Scalars['String']['input']>;
  /** Key for the specific preference (e.g., 'ai_tone', 'auto_summarize', 'email_unwanted_senders') */
  preference_key?: InputMaybe<Scalars['String']['input']>;
  /** Value of the preference (e.g., 'professional', 'true', '15', '["spam.com", "newsletter.net"]') */
  preference_value?: InputMaybe<Scalars['String']['input']>;
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
  has_synced?: InputMaybe<Scalars['Int']['input']>;
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
  has_synced?: InputMaybe<Scalars['Int']['input']>;
};

export type User = {
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  emailVerified?: Maybe<Scalars['DateTime']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type UserEmail = {
  id: Scalars['ID']['output'];
  fromEmail?: Maybe<Scalars['String']['output']>;
  toEmails?: Maybe<Array<Scalars['String']['output']>>;
  ccEmails?: Maybe<Array<Scalars['String']['output']>>;
  bccEmails?: Maybe<Array<Scalars['String']['output']>>;
  subject?: Maybe<Scalars['String']['output']>;
  snippet?: Maybe<Scalars['String']['output']>;
  internalDate?: Maybe<Scalars['String']['output']>;
  isRead?: Maybe<Scalars['Boolean']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  labelIds?: Maybe<Array<Scalars['String']['output']>>;
};

export type UserCalendarEvent = {
  id: Scalars['ID']['output'];
  summary?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  startTime?: Maybe<Scalars['String']['output']>;
  endTime?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>;
  Mutation: ResolverTypeWrapper<{}>;
  accounts: ResolverTypeWrapper<accounts>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']['output']>;
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']['output']>;
  users: ResolverTypeWrapper<users>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  accounts_WhereInput: accounts_WhereInput;
  accounts_OrderByInput: accounts_OrderByInput;
  OrderBy: OrderBy;
  cleanup_suggestions: ResolverTypeWrapper<cleanup_suggestions>;
  cleanup_suggestions_suggested_action: cleanup_suggestions_suggested_action;
  cleanup_suggestions_status: cleanup_suggestions_status;
  user_emails: ResolverTypeWrapper<user_emails>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  user_emails_status: user_emails_status;
  cleanup_suggestions_WhereInput: cleanup_suggestions_WhereInput;
  cleanup_suggestions_OrderByInput: cleanup_suggestions_OrderByInput;
  users_WhereInput: users_WhereInput;
  users_OrderByInput: users_OrderByInput;
  user_emails_WhereInput: user_emails_WhereInput;
  user_emails_OrderByInput: user_emails_OrderByInput;
  sessions: ResolverTypeWrapper<sessions>;
  sessions_WhereInput: sessions_WhereInput;
  sessions_OrderByInput: sessions_OrderByInput;
  user_calendar_events: ResolverTypeWrapper<user_calendar_events>;
  user_calendar_events_status: user_calendar_events_status;
  user_calendar_events_WhereInput: user_calendar_events_WhereInput;
  user_calendar_events_OrderByInput: user_calendar_events_OrderByInput;
  user_preferences: ResolverTypeWrapper<user_preferences>;
  user_preferences_WhereInput: user_preferences_WhereInput;
  user_preferences_OrderByInput: user_preferences_OrderByInput;
  accounts_InsertInput: accounts_InsertInput;
  accounts_UpdateInput: accounts_UpdateInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  cleanup_suggestions_InsertInput: cleanup_suggestions_InsertInput;
  cleanup_suggestions_UpdateInput: cleanup_suggestions_UpdateInput;
  sessions_InsertInput: sessions_InsertInput;
  sessions_UpdateInput: sessions_UpdateInput;
  user_calendar_events_InsertInput: user_calendar_events_InsertInput;
  user_calendar_events_UpdateInput: user_calendar_events_UpdateInput;
  user_emails_InsertInput: user_emails_InsertInput;
  user_emails_UpdateInput: user_emails_UpdateInput;
  user_preferences_InsertInput: user_preferences_InsertInput;
  user_preferences_UpdateInput: user_preferences_UpdateInput;
  users_InsertInput: users_InsertInput;
  users_UpdateInput: users_UpdateInput;
  User: ResolverTypeWrapper<User>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  UserEmail: ResolverTypeWrapper<UserEmail>;
  UserCalendarEvent: ResolverTypeWrapper<UserCalendarEvent>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {};
  Mutation: {};
  accounts: accounts;
  String: Scalars['String']['output'];
  BigInt: Scalars['BigInt']['output'];
  Timestamp: Scalars['Timestamp']['output'];
  users: users;
  DateTime: Scalars['DateTime']['output'];
  Int: Scalars['Int']['output'];
  accounts_WhereInput: accounts_WhereInput;
  accounts_OrderByInput: accounts_OrderByInput;
  cleanup_suggestions: cleanup_suggestions;
  user_emails: user_emails;
  JSON: Scalars['JSON']['output'];
  cleanup_suggestions_WhereInput: cleanup_suggestions_WhereInput;
  cleanup_suggestions_OrderByInput: cleanup_suggestions_OrderByInput;
  users_WhereInput: users_WhereInput;
  users_OrderByInput: users_OrderByInput;
  user_emails_WhereInput: user_emails_WhereInput;
  user_emails_OrderByInput: user_emails_OrderByInput;
  sessions: sessions;
  sessions_WhereInput: sessions_WhereInput;
  sessions_OrderByInput: sessions_OrderByInput;
  user_calendar_events: user_calendar_events;
  user_calendar_events_WhereInput: user_calendar_events_WhereInput;
  user_calendar_events_OrderByInput: user_calendar_events_OrderByInput;
  user_preferences: user_preferences;
  user_preferences_WhereInput: user_preferences_WhereInput;
  user_preferences_OrderByInput: user_preferences_OrderByInput;
  accounts_InsertInput: accounts_InsertInput;
  accounts_UpdateInput: accounts_UpdateInput;
  Boolean: Scalars['Boolean']['output'];
  cleanup_suggestions_InsertInput: cleanup_suggestions_InsertInput;
  cleanup_suggestions_UpdateInput: cleanup_suggestions_UpdateInput;
  sessions_InsertInput: sessions_InsertInput;
  sessions_UpdateInput: sessions_UpdateInput;
  user_calendar_events_InsertInput: user_calendar_events_InsertInput;
  user_calendar_events_UpdateInput: user_calendar_events_UpdateInput;
  user_emails_InsertInput: user_emails_InsertInput;
  user_emails_UpdateInput: user_emails_UpdateInput;
  user_preferences_InsertInput: user_preferences_InsertInput;
  user_preferences_UpdateInput: user_preferences_UpdateInput;
  users_InsertInput: users_InsertInput;
  users_UpdateInput: users_UpdateInput;
  User: User;
  ID: Scalars['ID']['output'];
  UserEmail: UserEmail;
  UserCalendarEvent: UserCalendarEvent;
}>;

export type transportDirectiveArgs = {
  subgraph?: Maybe<Scalars['String']['input']>;
  kind?: Maybe<Scalars['String']['input']>;
  location?: Maybe<Scalars['String']['input']>;
};

export type transportDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = transportDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type mysqlSelectDirectiveArgs = {
  subgraph?: Maybe<Scalars['String']['input']>;
  table?: Maybe<Scalars['String']['input']>;
  columnMap?: Maybe<Array<Maybe<Array<Maybe<Scalars['String']['input']>>>>>;
};

export type mysqlSelectDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = mysqlSelectDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type mysqlInsertDirectiveArgs = {
  subgraph?: Maybe<Scalars['String']['input']>;
  table?: Maybe<Scalars['String']['input']>;
  primaryKeys?: Maybe<Array<Maybe<Scalars['String']['input']>>>;
};

export type mysqlInsertDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = mysqlInsertDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type mysqlUpdateDirectiveArgs = {
  subgraph?: Maybe<Scalars['String']['input']>;
  table?: Maybe<Scalars['String']['input']>;
  columnMap?: Maybe<Array<Maybe<Array<Maybe<Scalars['String']['input']>>>>>;
};

export type mysqlUpdateDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = mysqlUpdateDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type mysqlDeleteDirectiveArgs = {
  subgraph?: Maybe<Scalars['String']['input']>;
  table?: Maybe<Scalars['String']['input']>;
};

export type mysqlDeleteDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = mysqlDeleteDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type mysqlTableForeignDirectiveArgs = {
  subgraph?: Maybe<Scalars['String']['input']>;
  columnName?: Maybe<Scalars['String']['input']>;
};

export type mysqlTableForeignDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = mysqlTableForeignDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type mysqlCountDirectiveArgs = {
  subgraph?: Maybe<Scalars['String']['input']>;
  table?: Maybe<Scalars['String']['input']>;
};

export type mysqlCountDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = mysqlCountDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  accounts?: Resolver<Maybe<Array<Maybe<ResolversTypes['accounts']>>>, ParentType, ContextType, Partial<QueryaccountsArgs>>;
  count_accounts?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, Partial<Querycount_accountsArgs>>;
  cleanup_suggestions?: Resolver<Maybe<Array<Maybe<ResolversTypes['cleanup_suggestions']>>>, ParentType, ContextType, Partial<Querycleanup_suggestionsArgs>>;
  count_cleanup_suggestions?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, Partial<Querycount_cleanup_suggestionsArgs>>;
  sessions?: Resolver<Maybe<Array<Maybe<ResolversTypes['sessions']>>>, ParentType, ContextType, Partial<QuerysessionsArgs>>;
  count_sessions?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, Partial<Querycount_sessionsArgs>>;
  user_calendar_events?: Resolver<Maybe<Array<Maybe<ResolversTypes['user_calendar_events']>>>, ParentType, ContextType, Partial<Queryuser_calendar_eventsArgs>>;
  count_user_calendar_events?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, Partial<Querycount_user_calendar_eventsArgs>>;
  user_emails?: Resolver<Maybe<Array<Maybe<ResolversTypes['user_emails']>>>, ParentType, ContextType, Partial<Queryuser_emailsArgs>>;
  count_user_emails?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, Partial<Querycount_user_emailsArgs>>;
  user_preferences?: Resolver<Maybe<Array<Maybe<ResolversTypes['user_preferences']>>>, ParentType, ContextType, Partial<Queryuser_preferencesArgs>>;
  count_user_preferences?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, Partial<Querycount_user_preferencesArgs>>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['users']>>>, ParentType, ContextType, Partial<QueryusersArgs>>;
  count_users?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, Partial<Querycount_usersArgs>>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userEmailsByUser?: Resolver<Array<ResolversTypes['UserEmail']>, ParentType, ContextType, RequireFields<QueryuserEmailsByUserArgs, 'userId'>>;
  userCalendarEventsByUser?: Resolver<Array<ResolversTypes['UserCalendarEvent']>, ParentType, ContextType, RequireFields<QueryuserCalendarEventsByUserArgs, 'userId'>>;
}>;

export type MutationResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  insert_accounts?: Resolver<Maybe<ResolversTypes['accounts']>, ParentType, ContextType, RequireFields<Mutationinsert_accountsArgs, 'accounts'>>;
  update_accounts?: Resolver<Maybe<ResolversTypes['accounts']>, ParentType, ContextType, RequireFields<Mutationupdate_accountsArgs, 'accounts'>>;
  delete_accounts?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, Partial<Mutationdelete_accountsArgs>>;
  insert_cleanup_suggestions?: Resolver<Maybe<ResolversTypes['cleanup_suggestions']>, ParentType, ContextType, RequireFields<Mutationinsert_cleanup_suggestionsArgs, 'cleanup_suggestions'>>;
  update_cleanup_suggestions?: Resolver<Maybe<ResolversTypes['cleanup_suggestions']>, ParentType, ContextType, RequireFields<Mutationupdate_cleanup_suggestionsArgs, 'cleanup_suggestions'>>;
  delete_cleanup_suggestions?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, Partial<Mutationdelete_cleanup_suggestionsArgs>>;
  insert_sessions?: Resolver<Maybe<ResolversTypes['sessions']>, ParentType, ContextType, RequireFields<Mutationinsert_sessionsArgs, 'sessions'>>;
  update_sessions?: Resolver<Maybe<ResolversTypes['sessions']>, ParentType, ContextType, RequireFields<Mutationupdate_sessionsArgs, 'sessions'>>;
  delete_sessions?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, Partial<Mutationdelete_sessionsArgs>>;
  insert_user_calendar_events?: Resolver<Maybe<ResolversTypes['user_calendar_events']>, ParentType, ContextType, RequireFields<Mutationinsert_user_calendar_eventsArgs, 'user_calendar_events'>>;
  update_user_calendar_events?: Resolver<Maybe<ResolversTypes['user_calendar_events']>, ParentType, ContextType, RequireFields<Mutationupdate_user_calendar_eventsArgs, 'user_calendar_events'>>;
  delete_user_calendar_events?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, Partial<Mutationdelete_user_calendar_eventsArgs>>;
  insert_user_emails?: Resolver<Maybe<ResolversTypes['user_emails']>, ParentType, ContextType, RequireFields<Mutationinsert_user_emailsArgs, 'user_emails'>>;
  update_user_emails?: Resolver<Maybe<ResolversTypes['user_emails']>, ParentType, ContextType, RequireFields<Mutationupdate_user_emailsArgs, 'user_emails'>>;
  delete_user_emails?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, Partial<Mutationdelete_user_emailsArgs>>;
  insert_user_preferences?: Resolver<Maybe<ResolversTypes['user_preferences']>, ParentType, ContextType, RequireFields<Mutationinsert_user_preferencesArgs, 'user_preferences'>>;
  update_user_preferences?: Resolver<Maybe<ResolversTypes['user_preferences']>, ParentType, ContextType, RequireFields<Mutationupdate_user_preferencesArgs, 'user_preferences'>>;
  delete_user_preferences?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, Partial<Mutationdelete_user_preferencesArgs>>;
  insert_users?: Resolver<Maybe<ResolversTypes['users']>, ParentType, ContextType, RequireFields<Mutationinsert_usersArgs, 'users'>>;
  update_users?: Resolver<Maybe<ResolversTypes['users']>, ParentType, ContextType, RequireFields<Mutationupdate_usersArgs, 'users'>>;
  delete_users?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, Partial<Mutationdelete_usersArgs>>;
}>;

export type accountsResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['accounts'] = ResolversParentTypes['accounts']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  provider?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  provider_account_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  refresh_token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  access_token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  expires_at?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  token_type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  scope?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id_token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  session_state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  created_at?: Resolver<Maybe<ResolversTypes['Timestamp']>, ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['Timestamp']>, ParentType, ContextType>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['users']>>>, ParentType, ContextType, Partial<accountsusersArgs>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface TimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Timestamp'], any> {
  name: 'Timestamp';
}

export type usersResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['users'] = ResolversParentTypes['users']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email_verified?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  created_at?: Resolver<Maybe<ResolversTypes['Timestamp']>, ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['Timestamp']>, ParentType, ContextType>;
  last_synced_at?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  has_synced?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  accounts?: Resolver<Maybe<Array<Maybe<ResolversTypes['accounts']>>>, ParentType, ContextType, Partial<usersaccountsArgs>>;
  cleanup_suggestions?: Resolver<Maybe<Array<Maybe<ResolversTypes['cleanup_suggestions']>>>, ParentType, ContextType, Partial<userscleanup_suggestionsArgs>>;
  sessions?: Resolver<Maybe<Array<Maybe<ResolversTypes['sessions']>>>, ParentType, ContextType, Partial<userssessionsArgs>>;
  user_calendar_events?: Resolver<Maybe<Array<Maybe<ResolversTypes['user_calendar_events']>>>, ParentType, ContextType, Partial<usersuser_calendar_eventsArgs>>;
  user_emails?: Resolver<Maybe<Array<Maybe<ResolversTypes['user_emails']>>>, ParentType, ContextType, Partial<usersuser_emailsArgs>>;
  user_preferences?: Resolver<Maybe<Array<Maybe<ResolversTypes['user_preferences']>>>, ParentType, ContextType, Partial<usersuser_preferencesArgs>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type cleanup_suggestionsResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['cleanup_suggestions'] = ResolversParentTypes['cleanup_suggestions']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  provider_email_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  from_email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  subject?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  snippet?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  reason?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  suggested_action?: Resolver<ResolversTypes['cleanup_suggestions_suggested_action'], ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['cleanup_suggestions_status']>, ParentType, ContextType>;
  created_at?: Resolver<Maybe<ResolversTypes['Timestamp']>, ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['Timestamp']>, ParentType, ContextType>;
  user_emails?: Resolver<Maybe<Array<Maybe<ResolversTypes['user_emails']>>>, ParentType, ContextType, Partial<cleanup_suggestionsuser_emailsArgs>>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['users']>>>, ParentType, ContextType, Partial<cleanup_suggestionsusersArgs>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type user_emailsResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['user_emails'] = ResolversParentTypes['user_emails']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  provider_email_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  thread_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  from_email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  to_emails?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  cc_emails?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  bcc_emails?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  subject?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  snippet?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  internal_date?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  received_at?: Resolver<Maybe<ResolversTypes['Timestamp']>, ParentType, ContextType>;
  is_read?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  label_ids?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['user_emails_status']>, ParentType, ContextType>;
  raw_body_hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  created_at?: Resolver<Maybe<ResolversTypes['Timestamp']>, ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['Timestamp']>, ParentType, ContextType>;
  cleanup_suggestions?: Resolver<Maybe<Array<Maybe<ResolversTypes['cleanup_suggestions']>>>, ParentType, ContextType, Partial<user_emailscleanup_suggestionsArgs>>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['users']>>>, ParentType, ContextType, Partial<user_emailsusersArgs>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface JSONScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type sessionsResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['sessions'] = ResolversParentTypes['sessions']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  session_token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  expires?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  created_at?: Resolver<Maybe<ResolversTypes['Timestamp']>, ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['Timestamp']>, ParentType, ContextType>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['users']>>>, ParentType, ContextType, Partial<sessionsusersArgs>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type user_calendar_eventsResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['user_calendar_events'] = ResolversParentTypes['user_calendar_events']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  provider_event_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  calendar_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  summary?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  start_time?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  end_time?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  attendees?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['user_calendar_events_status'], ParentType, ContextType>;
  html_link?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ingested_at?: Resolver<Maybe<ResolversTypes['Timestamp']>, ParentType, ContextType>;
  created_at?: Resolver<Maybe<ResolversTypes['Timestamp']>, ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['Timestamp']>, ParentType, ContextType>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['users']>>>, ParentType, ContextType, Partial<user_calendar_eventsusersArgs>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type user_preferencesResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['user_preferences'] = ResolversParentTypes['user_preferences']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  preference_key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  preference_value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  created_at?: Resolver<Maybe<ResolversTypes['Timestamp']>, ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['Timestamp']>, ParentType, ContextType>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['users']>>>, ParentType, ContextType, Partial<user_preferencesusersArgs>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  emailVerified?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserEmailResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['UserEmail'] = ResolversParentTypes['UserEmail']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  fromEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  toEmails?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  ccEmails?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  bccEmails?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  subject?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  snippet?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  internalDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isRead?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  labelIds?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserCalendarEventResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['UserCalendarEvent'] = ResolversParentTypes['UserCalendarEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  summary?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  startTime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  endTime?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  accounts?: accountsResolvers<ContextType>;
  BigInt?: GraphQLScalarType;
  Timestamp?: GraphQLScalarType;
  users?: usersResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  cleanup_suggestions?: cleanup_suggestionsResolvers<ContextType>;
  user_emails?: user_emailsResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  sessions?: sessionsResolvers<ContextType>;
  user_calendar_events?: user_calendar_eventsResolvers<ContextType>;
  user_preferences?: user_preferencesResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserEmail?: UserEmailResolvers<ContextType>;
  UserCalendarEvent?: UserCalendarEventResolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
  transport?: transportDirectiveResolver<any, any, ContextType>;
  mysqlSelect?: mysqlSelectDirectiveResolver<any, any, ContextType>;
  mysqlInsert?: mysqlInsertDirectiveResolver<any, any, ContextType>;
  mysqlUpdate?: mysqlUpdateDirectiveResolver<any, any, ContextType>;
  mysqlDelete?: mysqlDeleteDirectiveResolver<any, any, ContextType>;
  mysqlTableForeign?: mysqlTableForeignDirectiveResolver<any, any, ContextType>;
  mysqlCount?: mysqlCountDirectiveResolver<any, any, ContextType>;
}>;

export type MeshContext = MySqlTypes.Context & BaseMeshContext;


import { fileURLToPath } from '@graphql-mesh/utils';
const baseDir = pathModule.join(pathModule.dirname(fileURLToPath(import.meta.url)), '..');

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  switch(relativeModuleId) {
    default:
      return Promise.reject(new Error(`Cannot find module '${relativeModuleId}'.`));
  }
};

const rootStore = new MeshStore('.mesh', new FsStoreStorageAdapter({
  cwd: baseDir,
  importFn,
  fileType: "ts",
}), {
  readonly: true,
  validate: false
});

export function getMeshOptions() {
  console.warn('WARNING: These artifacts are built for development mode. Please run "mesh build" to build production artifacts');
  return findAndParseConfig({
    dir: baseDir,
    artifactsDir: ".mesh",
    configName: "mesh",
    additionalPackagePrefixes: [],
    initialLoggerPrefix: "",
  });
}

export function createBuiltMeshHTTPHandler<TServerContext = {}>(): MeshHTTPHandler<TServerContext> {
  return createMeshHTTPHandler<TServerContext>({
    baseDir,
    getBuiltMesh: getBuiltMesh,
    rawServeConfig: {"port":4000,"endpoint":"/graphql","graphiql":true,"introspection":true},
  })
}

let meshInstance$: Promise<MeshInstance> | undefined;

export const pollingInterval = null;

export function getBuiltMesh(): Promise<MeshInstance> {
  if (meshInstance$ == null) {
    if (pollingInterval) {
      setInterval(() => {
        getMeshOptions()
        .then(meshOptions => getMesh(meshOptions))
        .then(newMesh =>
          meshInstance$.then(oldMesh => {
            oldMesh.destroy()
            meshInstance$ = Promise.resolve(newMesh)
          })
        ).catch(err => {
          console.error("Mesh polling failed so the existing version will be used:", err);
        });
      }, pollingInterval)
    }
    meshInstance$ = getMeshOptions().then(meshOptions => getMesh(meshOptions)).then(mesh => {
      const id = mesh.pubsub.subscribe('destroy', () => {
        meshInstance$ = undefined;
        mesh.pubsub.unsubscribe(id);
      });
      return mesh;
    });
  }
  return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) => getBuiltMesh().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) => getBuiltMesh().then(({ subscribe }) => subscribe(...args));