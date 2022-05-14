import { ClientError, gql } from "graphql-request";
import { useCallback, useState } from "react";
import { createGraphQLClient } from "./createGraphQLClient";
import { PostOptions } from "./PostOptions";
import { ServerError } from "./ServerError";
import { ServiceInput } from "./ServiceInput";

export function useRegisterService(
  options?: PostOptions
): [
  (data: ServiceInput) => void,
  { loading: boolean; error: ServerError | undefined }
] {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ServerError | undefined>();

  const post = useCallback(
    (input: ServiceInput) => {
      const graphQLClient = createGraphQLClient(options?.serverUrl);
      const postMutation = gql`
        mutation addService($input: ServiceInput!) {
          addService(input: $input){
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
          options?.onCompleted && options?.onCompleted(!!data["addService"]);
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
