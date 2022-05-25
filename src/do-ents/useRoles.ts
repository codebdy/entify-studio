import { Role } from "components/AuthBoard/meta/Role";
import { useRecoilValue } from "recoil";
import { authUrlState } from "recoil/atoms";
import { ServerError } from "./ServerError";
import { useGQLQuery } from "./useGQLQuery";

const queryName = "role"

const gql = `
  query{
    ${queryName}{
      id
      name
    }
  }
`;
export function useRoles(): {
  roles?: Role[];
  loading?: boolean;
  error?: ServerError;
} {
  const authUrl = useRecoilValue(authUrlState);
  const { data, loading, error } = useGQLQuery<Role[]>(
    authUrl ? gql : "",
    authUrl
  );
  return {
    roles: data ? data[queryName] : undefined,
    loading,
    error,
  };
}
