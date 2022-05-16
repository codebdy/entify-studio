import { GraphQLError } from "graphql-request/dist/types";
import { AuthenticationService } from "recoil/atoms";
import { useGQLQuery } from "./useGQLQuery";

const gql = `
  query{
    authenticationService{
      url
      addedTime
    }
  }
`;

export function useAuthService(): {
  authService?: AuthenticationService;
  loading?: boolean;
  error?: GraphQLError;
} {
  const {data, loading, error} = useGQLQuery<AuthenticationService>(gql)
  return {authService: data ? data["authenticationService"]: undefined, loading, error}
}
