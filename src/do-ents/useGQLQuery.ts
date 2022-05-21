import { ClientError, GraphQLError } from "graphql-request/dist/types";
import { useCallback, useEffect, useState } from "react";
import { createGraphQLClient } from "./createGraphQLClient";

export interface GQLData<T> {
  [key: string]: T;
}

export function useGQLQuery<T>(
  gql: string,
  serverUrl?: string
): {
  data?: GQLData<T>;
  loading?: boolean;
  error?: GraphQLError;
  refresh: () => void;
} {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<GraphQLError>();
  const [data, setData] = useState<GQLData<T>>();
  const excute = useCallback(() => {
    const graphQLClient = createGraphQLClient(serverUrl);

    setLoading(true);
    setError(undefined);
    graphQLClient
      .request(gql)
      .then((data) => {
        setLoading(false);
        if (data) {
          setData(data);
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
  }, [gql, serverUrl]);

  useEffect(() => {
    if (gql) {
      excute();
    }
  }, [excute, gql]);

  const refreshFn = useCallback(() => {
    excute();
  }, [excute]);

  return { data, loading, error, refresh: refreshFn };
}
