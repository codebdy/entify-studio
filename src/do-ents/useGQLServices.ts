import { Service } from "components/ModelBoard/meta/Service";
import { ServerError } from "./ServerError";
import { useGQLQuery } from "./useGQLQuery";

const gql = `
  query{
    services{
      id
      name
      url
    }
  }
`;

export function useGQLServices(): {
  services?: Service[];
  loading?: boolean;
  error?: ServerError;
  refresh: () => void;
} {
  const { data, loading, error, refresh } = useGQLQuery<Service[]>(gql);
  return {
    services: data ? data["services"] : undefined,
    loading,
    error,
    refresh,
  };
}
