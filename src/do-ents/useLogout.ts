import { ClientError, gql } from "graphql-request";
import { useCallback, useState } from "react";
import { parseErrorMessage } from "./parseErrorMessage";
import { ServerError } from "./ServerError";
import { useCreateGQLClient } from "./useCreateGQLClient";

const logoutMutation = gql`
  mutation {
    logout
  }
`;
export interface LogoutOptions {
  serverUrl?: string;
  onCompleted?: () => void;
  onError?: (error?: ServerError) => void;
}

export function useLogout(
  options?: LogoutOptions
): [
  () => void,
  { token?: string; loading?: boolean; error?: ServerError }
] {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ServerError | undefined>();
  const createClient = useCreateGQLClient();

  const logout = useCallback(
    () => {
      const graphQLClient = createClient(options?.serverUrl);

      setLoading(true);
      setError(undefined);
      graphQLClient
        .request(logoutMutation)
        .then((data) => {
          setLoading(false);
          options?.onCompleted && options?.onCompleted();
        })
        .catch((err: ClientError) => {
          const message = parseErrorMessage(err);
          setLoading(false);
          const serverError:ServerError = { message: message, serverUrl:options?.serverUrl }
          setError(serverError);
          console.error(err);
          options?.onError && options?.onError(serverError);
        });
    },
    [createClient, options]
  );

  return [logout, { loading, error }];
}
