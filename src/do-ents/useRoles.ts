import { Role } from "components/AuthBoard/meta/Role";
import { GraphQLError } from "graphql-request/dist/types";
import { useRecoilValue } from "recoil";
import { authUrlState } from "recoil/atoms";
import { useGQLQuery } from "./useGQLQuery";

const gql = `
  query{
    role{
      id
      name
    }
  }
`;
export function useRoles(): {
  roles?: Role[];
  loading?: boolean;
  error?: GraphQLError;
} {
  const authUrl = useRecoilValue(authUrlState);
  const { data, loading, error } = useGQLQuery<Role[]>(
    authUrl ? gql : "",
    authUrl
  );
  return {
    roles: data ? data["role"] : undefined,
    loading,
    error,
  };
}
