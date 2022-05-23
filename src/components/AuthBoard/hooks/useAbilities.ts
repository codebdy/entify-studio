import { useGQLQuery } from "do-ents/useGQLQuery";
import { GraphQLError } from "graphql-request/dist/types";
import { Ability } from "../meta/Ability";

const queryName = "ability";

const gql = `
  query{
    ${queryName}{
      id
      roleId
      abilityType
      can
      entityUuid
      columnUuid
      expression
    }
  }
`;
export function useAbilities(serverUrl: string | undefined): {
  abilities?: Ability[];
  loading?: boolean;
  error?: GraphQLError;
} {
  const { data, loading, error } = useGQLQuery<Ability[]>(
    serverUrl ? gql : "",
    serverUrl
  );
  return {
    //abilities: data ? data[queryName] : undefined,
    //loading,
    //error,
  };
}
