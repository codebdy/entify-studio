import { ClientError, GraphQLError } from "graphql-request/dist/types";
import { useCallback, useState } from "react";
import { useCreateGQLClient } from "./useCreateGQLClient";
import { PostOptions } from "./PostOptions";

const checkApi = "entifyInstalled";

const gql = `
  query{
    ${checkApi}
  }
`;

export function useServiceCheck(options?: PostOptions): [
  (serverUrl: string) => void,
  {
    installed?: boolean;
    loading?: boolean;
    error?: GraphQLError;
  }
] {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<GraphQLError>();
  const [installed, setInstalled] = useState<boolean>();
  const createClient = useCreateGQLClient()

  const check = useCallback(
    (serverUrl: string) => {
      const graphQLClient = createClient(serverUrl);

      setLoading(true);
      setError(undefined);
      graphQLClient
        .request(gql)
        .then((data) => {
          setLoading(false);
          if (data) {
            setInstalled(data[checkApi]);
          }

          options?.onCompleted && options?.onCompleted(data[checkApi]);
        })
        .catch((err: ClientError) => {
          const error: GraphQLError | undefined = err.response?.errors
            ? err.response.errors[0]
            : err;
          setLoading(false);
          setError(error);
          console.error(err);
          error && options?.onError && options?.onError(error);
        });
    },
    [createClient, options]
  );

  return [
    check,
    {
      installed,
      loading,
      error,
    },
  ];
}
