import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type User {
    id: ID!
    name: String
    email: String!
    emailVerified: String
    image: String
    createdAt: String!
    updatedAt: String!
    accounts: [Account!]!
    sessions: [Session!]!
    emails: [UserEmail!]!
    calendarEvents: [UserCalendarEvent!]!
  }

  type Account {
    id: ID!
    userId: ID!
    type: String!
    provider: String!
    providerAccountId: String!
    refreshToken: String
    accessToken: String
    expiresAt: Int
    tokenType: String
    scope: String
    idToken: String
    sessionState: String
    createdAt: String!
    updatedAt: String!
    user: User!
  }

  type Session {
    id: ID!
    sessionToken: String!
    userId: ID!
    expires: String!
    createdAt: String!
    updatedAt: String!
    user: User!
  }

  type UserEmail {
    id: ID!
    userId: ID!
    providerEmailId: String!
    threadId: String
    fromEmail: String
    toEmails: [String]
    ccEmails: [String]
    bccEmails: [String]
    subject: String
    snippet: String
    internalDate: String
    receivedAt: String
    isRead: Boolean
    labelIds: [String]
    status: String
    rawBodyHash: String
    createdAt: String!
    updatedAt: String!
  }

  type UserCalendarEvent {
    id: ID!
    userId: ID!
    providerEventId: String!
    calendarId: String!
    summary: String
    description: String
    startTime: String!
    endTime: String!
    location: String
    attendees: String
    status: String!
    htmlLink: String
    ingestedAt: String
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    userByEmail(email: String!): User
    me: User
    
    accounts: [Account!]!
    account(id: ID!): Account
    accountsByUser(userId: ID!): [Account!]!
    
    sessions: [Session!]!
    session(id: ID!): Session
    sessionsByUser(userId: ID!): [Session!]!

    userEmails: [UserEmail!]!
    userEmail(id: ID!): UserEmail
    userEmailsByUser(userId: ID!): [UserEmail!]!

    userCalendarEvents: [UserCalendarEvent!]!
    userCalendarEvent(id: ID!): UserCalendarEvent
    userCalendarEventsByUser(userId: ID!): [UserCalendarEvent!]!
  }

  type Mutation {
    # User mutations
    createUser(input: CreateUserInput!): User!
    updateUser(id: ID!, input: UpdateUserInput!): User!
    deleteUser(id: ID!): Boolean!
    
    # Account mutations
    createAccount(input: CreateAccountInput!): Account!
    updateAccount(id: ID!, input: UpdateAccountInput!): Account!
    deleteAccount(id: ID!): Boolean!
    
    # Session mutations
    createSession(input: CreateSessionInput!): Session!
    updateSession(id: ID!, input: UpdateSessionInput!): Session!
    deleteSession(id: ID!): Boolean!

    createUserEmail(input: CreateUserEmailInput!): UserEmail!
    updateUserEmail(id: ID!, input: UpdateUserEmailInput!): UserEmail!
    deleteUserEmail(id: ID!): Boolean!

    createUserCalendarEvent(input: CreateUserCalendarEventInput!): UserCalendarEvent!
    updateUserCalendarEvent(id: ID!, input: UpdateUserCalendarEventInput!): UserCalendarEvent!
    deleteUserCalendarEvent(id: ID!): Boolean!
  }

  input CreateUserInput {
    name: String
    email: String!
    emailVerified: String
    image: String
  }

  input UpdateUserInput {
    name: String
    email: String
    emailVerified: String
    image: String
  }

  input CreateAccountInput {
    userId: ID!
    type: String!
    provider: String!
    providerAccountId: String!
    refreshToken: String
    accessToken: String
    expiresAt: Int
    tokenType: String
    scope: String
    idToken: String
    sessionState: String
  }

  input UpdateAccountInput {
    type: String
    provider: String
    providerAccountId: String
    refreshToken: String
    accessToken: String
    expiresAt: Int
    tokenType: String
    scope: String
    idToken: String
    sessionState: String
  }

  input CreateSessionInput {
    sessionToken: String!
    userId: ID!
    expires: String!
  }

  input UpdateSessionInput {
    sessionToken: String
    expires: String
  }

  input CreateUserEmailInput {
    userId: ID!
    providerEmailId: String!
    threadId: String
    fromEmail: String
    toEmails: String
    ccEmails: String
    bccEmails: String
    subject: String
    snippet: String
    internalDate: String
    isRead: Boolean
    labelIds: String
    status: String
    rawBodyHash: String
  }

  input UpdateUserEmailInput {
    threadId: String
    fromEmail: String
    toEmails: String
    ccEmails: String
    bccEmails: String
    subject: String
    snippet: String
    internalDate: String
    isRead: Boolean
    labelIds: String
    status: String
    rawBodyHash: String
  }

  input CreateUserCalendarEventInput {
    userId: ID!
    providerEventId: String!
    calendarId: String!
    summary: String
    description: String
    startTime: String!
    endTime: String!
    location: String
    attendees: String
    status: String!
    htmlLink: String
  }

  input UpdateUserCalendarEventInput {
    summary: String
    description: String
    startTime: String
    endTime: String
    location: String
    attendees: String
    status: String
    htmlLink: String
  }
`; 