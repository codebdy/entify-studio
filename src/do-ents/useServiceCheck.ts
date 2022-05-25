import { ClientError } from "graphql-request/dist/types";
import { useCallback, useState } from "react";
import { useCreateGQLClient } from "./useCreateGQLClient";
import { PostOptions } from "./PostOptions";
import { ServerError } from "./ServerError";
import { parseErrorMessage } from "./parseErrorMessage";

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
    error?: ServerError;
  }
] {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ServerError>();
  const [installed, setInstalled] = useState<boolean>();
  const createClient = useCreateGQLClient();

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
          const message = parseErrorMessage(err);
          setLoading(false);
          const serverError: ServerError = {
            message: message,
            serverUrl: options?.serverUrl,
          };
          setError(serverError);
          console.error(err);
          error && options?.onError && options?.onError(serverError);
        });
    },
    [createClient, error, options]
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
