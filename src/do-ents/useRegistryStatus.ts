import { ClientError, GraphQLError } from "graphql-request/dist/types";
import { useCallback, useEffect, useState } from "react";
import { RegistryStatus } from "recoil/atoms";
import { createGraphQLClient } from "./createGraphQLClient";

const gql = `
  query{
    status{
      installed
      authInstalled
    }
  }
`

export function useRegistryStatus(): {
  status?: RegistryStatus;
  loading?: boolean;
  error?: GraphQLError;
} {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<GraphQLError>();
  const [status, setStatus] = useState<RegistryStatus>();
  const excute = useCallback((server?:string) => {
    const graphQLClient = createGraphQLClient(server);

    setLoading(true);
    setError(undefined);
    graphQLClient
      .request(gql)
      .then((data) => {
        setLoading(false);
        if (data) {
          setStatus(data["status"]);
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

  return { status, loading, error };
}
