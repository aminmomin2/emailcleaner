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
`; 