import { GraphQLError } from "graphql-request/dist/types";
import { Service } from "components/ModelBoard/meta/Service";
import { useGQLQuery } from "./useGQLQuery";

const gql = `
  query{
    services{
      id
      name
      url
      version
    }
  }
`;

export function useServices(): {
  services?: Service[];
  loading?: boolean;
  error?: GraphQLError;
} {
  const {data, loading, error} = useGQLQuery<Service[]>(gql)
  return {services: data ? data["services"]: undefined, loading, error}
}
