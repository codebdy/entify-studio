import { ClientError, gql } from "graphql-request";
import { useCallback, useState } from "react";
import { useCreateGQLClient } from "./useCreateGQLClient";
import { PostOptions } from "./PostOptions";
import { ServerError } from "./ServerError";
import { Service } from "../components/ModelBoard/meta/Service";
import { GraphQLError } from "graphql-request/dist/types";

export function useUpdateService(
  options?: PostOptions
): [
  (data: Service) => void,
  { loading: boolean; error: ServerError | undefined }
] {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ServerError | undefined>();
  const createClient = useCreateGQLClient();

  const post = useCallback(
    (input: Service) => {
      const graphQLClient = createClient(options?.serverUrl);
      const postMutation = gql`
        mutation updateService($input: ServiceInput!) {
          updateService(input: $input) {
            id
          }
        }
      `;

      setLoading(true);
      setError(undefined);
      graphQLClient
        .request(postMutation, { input })
        .then((data) => {
          setLoading(false);
          options?.onCompleted && options?.onCompleted(!!data["updateService"]);
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
