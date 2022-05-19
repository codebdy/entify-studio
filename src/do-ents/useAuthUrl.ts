import { ClientError, GraphQLError } from "graphql-request/dist/types";
import { useCallback, useEffect, useState } from "react";
import { createGraphQLClient } from "./createGraphQLClient";

const gql = `
  query{
    authUrl
  }
`

export function useAuthUrl(): {
  authUrl?: string;
  loading?: boolean;
  error?: GraphQLError;
} {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<GraphQLError>();
  const [authUrl, setAuthUrl] = useState<string>();
  const excute = useCallback((server?:string) => {
    const graphQLClient = createGraphQLClient(server);

    setLoading(true);
    setError(undefined);
    graphQLClient
      .request(gql)
      .then((data) => {
        setLoading(false);
        if (data) {
          setAuthUrl(data["authUrl"]);
        }
      })
      .catch((err: ClientError) => {
        const error: GraphQLError | undefined = err.response?.errors
          ? err.response.errors[0]
          : err;
        setLoading(false);
        setError(error);
        console.error(err);
      });
  }, []);

  useEffect(() => {
    excute();
  }, [excute]);

  return { authUrl, loading, error };
}
