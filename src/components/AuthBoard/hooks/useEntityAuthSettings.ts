import { ServerError } from "do-ents/ServerError";
import { useGQLQuery } from "do-ents/useGQLQuery";
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
  error?: ServerError;
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
