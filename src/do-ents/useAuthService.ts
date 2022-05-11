import { ClientError, GraphQLError } from "graphql-request/dist/types";
import { useCallback, useEffect, useState } from "react";
import { AuthenticationService } from "recoil/atoms";
import { createGraphQLClient } from "./createGraphQLClient";

const gql = `
  query{
    authenticationService{
      url
    }
  }
`;

export function useAuthService(): {
  authService?: AuthenticationService;
  loading?: boolean;
  error?: GraphQLError;
} {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<GraphQLError>();
  const [authService, setAuthService] = useState<AuthenticationService>();
  const excute = useCallback((server?: string) => {
    const graphQLClient = createGraphQLClient(server);

    setLoading(true);
    setError(undefined);
    graphQLClient
      .request(gql)
      .then((data) => {
        setLoading(false);
        if (data) {
          setAuthService(data["authenticationService"]);
        }
      })
      .catch((err: ClientError) => {
        const error: GraphQLError | undefined = err.response?.errors
          ? err.response.errors[0]
          : err;
        setLoading(false);
        setError(error);
        console.error(err);
      });
  }, []);

  useEffect(() => {
    excute();
  }, [excute]);

  return { authService, loading, error };
}
