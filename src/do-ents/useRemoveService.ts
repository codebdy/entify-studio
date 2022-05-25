import { ClientError, gql } from "graphql-request";
import { useCallback, useState } from "react";
import { useCreateGQLClient } from "./useCreateGQLClient";
import { PostOptions } from "./PostOptions";
import { ServerError } from "./ServerError";
import { GraphQLError } from "graphql-request/dist/types";

export function useRemoveService(
  options?: PostOptions
): [
  (id: number) => void,
  { loading: boolean; error: ServerError | undefined }
] {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ServerError | undefined>();
  const createClient = useCreateGQLClient();

  const post = useCallback(
    (id: number) => {
      const graphQLClient = createClient(options?.serverUrl);
      const postMutation = gql`
        mutation removeService($id: Int!) {
          removeService(id: $id) {
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
          const error: GraphQLError | undefined = err.response?.errors
            ? err.response.errors[0]
            : err;
          setLoading(false);
          const serverError: ServerError = {
            message: error?.message,
            serverUrl: options?.serverUrl,
          };
          setError(serverError);
          console.error(err);
          error && options?.onError && options?.onError(serverError);
        });
    },
    [createClient, options]
  );

  return [post, { loading, error }];
}
