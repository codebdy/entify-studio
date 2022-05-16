import { Service } from "components/ModelBoard/meta/Service";
import { GraphQLError } from "graphql-request/dist/types";
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
  authService?: Service;
  loading?: boolean;
  error?: GraphQLError;
} {
  const {data, loading, error} = useGQLQuery<Service>(gql)
  return {authService: data ? data["authenticationService"]: undefined, loading, error}
}
