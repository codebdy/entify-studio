import { ClientError, GraphQLError } from "graphql-request/dist/types";
import { useCallback, useEffect, useState } from "react";
import { createGraphQLClient } from "./createGraphQLClient";
import { Service } from "components/ModelBoard/meta/Service";

export interface IQueryOpions {}
export type MutateFn<T> = (data?: T) => void;

const gql = `
  query{
    _service{
      id
    }
  }
`;

export function useService(serverUrl?: string): {
  service?: Service;
  loading?: boolean;
  error?: GraphQLError;
} {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<GraphQLError>();
  const [service, setService] = useState<Service>();
  const excute = useCallback(
    (server?: string) => {
      if (serverUrl === "") {
        setService(undefined);
        return;
      }
      const graphQLClient = createGraphQLClient(server);
      setLoading(true);
      setError(undefined);
      graphQLClient
        .request(gql)
        .then((data) => {
          setLoading(false);
          if (data) {
            setService(data["_service"]);
          } else {
            setService(undefined);
          }
        })
        .catch((err: ClientError) => {
          const error: GraphQLError | undefined = err.response?.errors
            ? err.response.errors[0]
            : err;
          setLoading(false);
          setError(error);
          setService(undefined);
          console.error(err);
        });
    },
    [serverUrl]
  );

  useEffect(() => {
    excute(serverUrl);
  }, [excute, serverUrl]);

  return { service, loading, error };
}
