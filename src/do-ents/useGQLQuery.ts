import { useMountRef } from "components/ModelBoard/GraphCanvas/ClassView/useMountRef";
import { ClientError, GraphQLError } from "graphql-request/dist/types";
import { useCallback, useEffect, useState } from "react";
import { ServerError } from "./ServerError";
import { useCreateGQLClient } from "./useCreateGQLClient";

export interface GQLData<T> {
  [key: string]: T;
}

export function useGQLQuery<T>(
  gql: string,
  serverUrl?: string
): {
  data?: GQLData<T>;
  loading?: boolean;
  error?: ServerError;
  refresh: () => void;
} {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ServerError>();
  const [data, setData] = useState<GQLData<T>>();
  const mountRef = useMountRef()
  const createClient = useCreateGQLClient()
  
  const excute = useCallback(() => {
    const graphQLClient = createClient(serverUrl);

    setLoading(true);
    setError(undefined);
    graphQLClient
      .request(gql)
      .then((data) => {
        if (!mountRef.current) {
          return;
        }
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
        setError({message: error.message, serverUrl});
        console.error(err);
      });
  }, [createClient, gql, mountRef, serverUrl]);

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
