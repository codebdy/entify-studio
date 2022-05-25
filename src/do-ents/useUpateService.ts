import { ClientError, gql } from "graphql-request";
import { useCallback, useState } from "react";
import { useCreateGQLClient } from "./useCreateGQLClient";
import { PostOptions } from "./PostOptions";
import { ServerError } from "./ServerError";
import { Service } from "../components/ModelBoard/meta/Service";
import { parseErrorMessage } from "./parseErrorMessage";

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

  return [post, { loading, error }];
}
