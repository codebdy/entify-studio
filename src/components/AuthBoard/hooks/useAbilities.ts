import { ServerError } from "do-ents/ServerError";
import { useGQLQuery } from "do-ents/useGQLQuery";
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
  error?: ServerError;
} {
  const { data, loading, error } = useGQLQuery<Ability[]>(
    serverUrl ? gql : "",
    serverUrl
  );
  return {
    abilities: data ? data[queryName] : undefined,
    loading,
    error,
  };
}
