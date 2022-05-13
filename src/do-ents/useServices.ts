import { ClientError, GraphQLError } from "graphql-request/dist/types";
import { useCallback, useEffect, useState } from "react";
import { createGraphQLClient } from "./createGraphQLClient";
import { Service } from "components/ModelBoard/meta/Service";

export interface IQueryOpions {}
export type MutateFn<T> = (data?: T) => void;

const gql = `
  query{
    services{
      id
      name
      url
      version
    }
  }
`

export function useServices(): {
  services?: Service[];
  loading?: boolean;
  error?: GraphQLError;
} {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<GraphQLError>();
  const [services, setServices] = useState<Service[]>();
  const excute = useCallback((server?:string) => {
    const graphQLClient = createGraphQLClient(server);

    setLoading(true);
    setError(undefined);
    graphQLClient
      .request(gql)
      .then((data) => {
        setLoading(false);
        if (data) {
          setServices(data["services"]);
        }
      })
      .catch((err: ClientError) => {
        const error: GraphQLError | undefined = err.response?.errors
          ? err.response.errors[0]
          : err;
        setLoading(false);
        setError(error);
        console.error(err);
      });
  }, []);

  useEffect(() => {
    excute();
  }, [excute]);

  return { services, loading, error };
}
