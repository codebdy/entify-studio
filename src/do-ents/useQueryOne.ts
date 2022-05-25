import { ClientError } from "graphql-request/dist/types";
import { useCallback, useEffect, useState } from "react";
import { useCreateGQLClient } from "./useCreateGQLClient";
import { useMountRef } from "components/ModelBoard/GraphCanvas/ClassView/useMountRef";
import { ServerError } from "./ServerError";
import { parseErrorMessage } from "./parseErrorMessage";

export interface IQueryOpions {}
export type MutateFn<T> = (data?: T) => void;

export interface QueryOneResult<T> {
  [key: string]: T | undefined;
}

export function useQueryOne<T>(
  gql: string,
  serverUrl?: string
): {
  data?: QueryOneResult<T>;
  mutate: MutateFn<T>;
  loading?: boolean;
  revalidating?: boolean;
  error?: ServerError;
} {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ServerError>();
  const [data, setData] = useState<QueryOneResult<T>>();
  const mountRef = useMountRef();
  const createClient = useCreateGQLClient();

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
        const message = parseErrorMessage(err);
        setLoading(false);
        setError({ message: message, serverUrl });
        console.error(err);
      });
  }, [createClient, gql, mountRef, serverUrl]);

  useEffect(() => {
    if (gql) {
      excute();
    }
  }, [excute, gql]);

  const mutate = useCallback((data?: T) => {
    console.log("执行Mutate");
  }, []);

  return { data, loading, error, mutate };
}
