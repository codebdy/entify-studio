import { useGQLQuery } from "do-ents/useGQLQuery";
import { GraphQLError } from "graphql-request/dist/types";
import { EntityAuthSettings } from "../meta/EntityAuthSettings";

const queryName = "entityAuthSettings";

const gql = `
  query{
    ${queryName}{
      id
      entityUuid
      expand
    }
  }
`;
export function useEntityAuthSettings(serverUrl: string | undefined): {
  settings?: EntityAuthSettings[];
  loading?: boolean;
  error?: GraphQLError;
} {
  const { data, loading, error } = useGQLQuery<EntityAuthSettings[]>(
    serverUrl ? gql : "",
    serverUrl
  );
  return {
    settings: data ? data[queryName] : undefined,
    loading,
    error,
  };
}
