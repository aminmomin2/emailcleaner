import { useQuery, useMutation } from "@apollo/client";
import {
  ME_QUERY,
  CREATE_USER_MUTATION,
  UPDATE_USER_MUTATION,
  ACCOUNTS_BY_USER_QUERY,
  SESSIONS_BY_USER_QUERY,
} from "@/graphql/auth";

// Get current user (me)
export function useMe() {
  return useQuery(ME_QUERY);
}

// Create user
export function useCreateUser() {
  return useMutation(CREATE_USER_MUTATION);
}

// Update user
export function useUpdateUser() {
  return useMutation(UPDATE_USER_MUTATION);
}

// Get accounts by user
export function useAccountsByUser(userId: string) {
  return useQuery(ACCOUNTS_BY_USER_QUERY, { variables: { userId } });
}

// Get sessions by user
export function useSessionsByUser(userId: string) {
  return useQuery(SESSIONS_BY_USER_QUERY, { variables: { userId } });
} 