import { ClientError, gql } from "graphql-request";
import { useCallback, useState } from "react";
import { createGraphQLClient } from "./createGraphQLClient";
import { PostOptions } from "./PostOptions";
import { ServerError } from "./ServerError";

export function useRemoveService(
  options?: PostOptions
): [
  (id: number) => void,
  { loading: boolean; error: ServerError | undefined }
] {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ServerError | undefined>();

  const post = useCallback(
    (id: number) => {
      const graphQLClient = createGraphQLClient(options?.serverUrl);
      const postMutation = gql`
        mutation removeService($input: ServiceInput!) {
          removeService(input: $input) {
            id
          }
        }
      `;

      setLoading(true);
      setError(undefined);
      graphQLClient
        .request(postMutation, { id })
        .then((data) => {
          setLoading(false);
          options?.onCompleted && options?.onCompleted(!!data["removeService"]);
        })
        .catch((err: ClientError) => {
          const error: ServerError | undefined = err.response?.errors
            ? err.response.errors[0]
            : err;
          setLoading(false);
          setError(error);
          console.error(err);
          error && options?.onError && options?.onError(error);
        });
    },
    [options]
  );

  return [post, { loading, error }];
}
