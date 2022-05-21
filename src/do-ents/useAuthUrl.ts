import { GraphQLError } from "graphql-request/dist/types";
import { useGQLQuery } from "./useGQLQuery";

const gql = `
  query{
    authUrl
  }
`;
export function useAuthUrl(): {
  authUrl?: string;
  loading?: boolean;
  error?: GraphQLError;
} {
  const { data, loading, error } = useGQLQuery<string>(gql);
  return {
    authUrl: data ? data["authUrl"] : undefined,
    loading,
    error,
  };
}
