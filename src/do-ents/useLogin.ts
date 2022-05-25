import { ClientError, gql } from "graphql-request";
import { GraphQLError } from "graphql-request/dist/types";
import { useCallback, useState } from "react";
import { ServerError } from "./ServerError";
import { useCreateGQLClient } from "./useCreateGQLClient";

const loginMutation = gql`
  mutation login($loginName: String!, $password: String!) {
    login(loginName: $loginName, password: $password)
  }
`;

export interface LoginOptions {
  serverUrl?: string;
  onCompleted?: (access_token: string) => void;
  onError?: (error?: ServerError) => void;
}

export function useLogin(
  options?: LoginOptions
): [
  (loginName: string, password: string) => void,
  { token?: string; loading?: boolean; error?: ServerError }
] {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ServerError | undefined>();
  const createClient = useCreateGQLClient();

  const login = useCallback(
    (loginName: string, password: string) => {
      const graphQLClient = createClient(options?.serverUrl);

      setLoading(true);
      setError(undefined);
      graphQLClient
        .request(loginMutation, { loginName, password })
        .then((data) => {
          setLoading(false);
          setToken(data.login);
          options?.onCompleted && options?.onCompleted(data.login);
        })
        .catch((err: ClientError) => {
          const error: GraphQLError | undefined = err.response?.errors
            ? err.response.errors[0]
            : undefined;
          setLoading(false);
          const serverError:ServerError = { message: error?.message, serverUrl:options?.serverUrl }
          setError(serverError);
          console.error(err);
          options?.onError && options?.onError(serverError);
        });
    },
    [createClient, options]
  );

  return [login, { token, loading, error }];
}
