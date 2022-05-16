import { GraphQLError } from "graphql-request/dist/types";
import { Service } from "components/ModelBoard/meta/Service";
import { useGQLQuery } from "./useGQLQuery";

const gql = `
  query{
    _service{
      id
    }
  }
`;

export function useService(serverUrl?: string): {
  service?: Service;
  loading?: boolean;
  error?: GraphQLError;
  refresh: () => void;
} {
  const {data, loading, error, refresh} = useGQLQuery<Service>(gql)
  return {service: data ? data["_service"]: undefined, loading, error, refresh}
}
