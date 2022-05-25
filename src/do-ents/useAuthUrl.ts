import { ServerError } from "./ServerError";
import { useGQLQuery } from "./useGQLQuery";

const gql = `
  query{
    authUrl
  }
`;
export function useAuthUrl(): {
  authUrl?: string;
  loading?: boolean;
  error?: ServerError;
} {
  const { data, loading, error } = useGQLQuery<string>(gql);
  return {
    authUrl: data ? data["authUrl"] : undefined,
    loading,
    error,
  };
}
