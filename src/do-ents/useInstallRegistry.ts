import { ClientError, gql } from "graphql-request";
import { useCallback, useState } from "react";
import { createGraphQLClient } from "./createGraphQLClient";
import { ServerError } from "./ServerError";

export interface InstallOptions {
  onCompleted?: (status: boolean) => void;
  onError?: (error: ServerError) => void;
}

export interface InstallInput{
	driver: string;
	user: string;
	password: string;
	host: string;
	port: string;
	database: string;
}

export function useInstallRegistry(
  options?: InstallOptions
): [(data: InstallInput) => void, { loading: boolean; error: ServerError | undefined }] {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ServerError | undefined>();

  const post = useCallback(
    (input: InstallInput) => {
      const graphQLClient = createGraphQLClient();
      const postMutation = gql`
        mutation install ($input: InstallInput!) {
          install(input: $input)
        }
      `;

      setLoading(true);
      setError(undefined);
      graphQLClient
        .request(postMutation, { input })
        .then((data) => {
          setLoading(false);
          options?.onCompleted && options?.onCompleted(data["install"]);
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
