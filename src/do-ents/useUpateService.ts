import { ClientError, gql } from "graphql-request";
import { useCallback, useState } from "react";
import { createGraphQLClient } from "./createGraphQLClient";
import { PostOptions } from "./PostOptions";
import { ServerError } from "./ServerError";
import { Service } from "../components/ModelBoard/meta/Service";

export function useUpdateService(
  options?: PostOptions
): [
  (data: Service) => void,
  { loading: boolean; error: ServerError | undefined }
] {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ServerError | undefined>();

  const post = useCallback(
    (input: Service) => {
      const graphQLClient = createGraphQLClient(options?.serverUrl);
      const postMutation = gql`
        mutation updateService($input: ServiceInput!) {
          updateService(input: $input){
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
