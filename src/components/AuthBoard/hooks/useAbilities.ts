import { useGQLQuery } from "do-ents/useGQLQuery";
import { GraphQLError } from "graphql-request/dist/types";
import { Ability } from "../meta/Ability";

const queryName = "ability"

const gql = `
  query{
    ${queryName}{
      id
      entityUuid
      expand
    }
  }
`;
export function useAbilities(serverUrl: string): {
  settings?: Ability[];
  loading?: boolean;
  error?: GraphQLError;
} {
  const { data, loading, error } = useGQLQuery<Ability[]>(
    serverUrl ? gql : "",
    serverUrl
  );
  return {
    settings: data ? data[queryName] : undefined,
    loading,
    error,
  };
}
