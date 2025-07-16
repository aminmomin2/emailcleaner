import { gql } from "@apollo/client";

// Query: Get current user (me)
export const ME_QUERY = gql`
  query Me {
    me {
      id
      name
      email
      emailVerified
      image
      createdAt
      updatedAt
      accounts {
        id
        provider
        providerAccountId
      }
      sessions {
        id
        sessionToken
        expires
      }
    }
  }
`;

// Mutation: Create user
export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      email
      emailVerified
      image
      createdAt
      updatedAt
    }
  }
`;

// Mutation: Update user
export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      name
      email
      emailVerified
      image
      createdAt
      updatedAt
    }
  }
`;

// Query: Get accounts by user
export const ACCOUNTS_BY_USER_QUERY = gql`
  query AccountsByUser($userId: ID!) {
    accountsByUser(userId: $userId) {
      id
      provider
      providerAccountId
      createdAt
      updatedAt
    }
  }
`;

// Query: Get sessions by user
export const SESSIONS_BY_USER_QUERY = gql`
  query SessionsByUser($userId: ID!) {
    sessionsByUser(userId: $userId) {
      id
      sessionToken
      expires
      createdAt
      updatedAt
    }
  }
`;

// Query: Get user emails by user
export const USER_EMAILS_BY_USER_QUERY = gql`
  query UserEmailsByUser($userId: ID!) {
    userEmailsByUser(userId: $userId) {
      id
      fromEmail
      toEmails
      subject
      snippet
      internalDate
      isRead
      createdAt
    }
  }
`;

// Query: Get user calendar events by user
export const USER_CALENDAR_EVENTS_BY_USER_QUERY = gql`
  query UserCalendarEventsByUser($userId: ID!) {
    userCalendarEventsByUser(userId: $userId) {
      id
      summary
      description
      startTime
      endTime
      location
      status
      createdAt
    }
  }
`; 