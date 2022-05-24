import { GraphQLClient } from "graphql-request";
import { useToken } from "hooks/useToken";
import { useCallback } from "react";
import { SERVER_URL } from "util/consts";

export function useCreateGQLClient() {
  const token = useToken();
  const create = useCallback((server?: string) => {
    const client = new GraphQLClient(
      server === undefined ? SERVER_URL : server,
      {
        mode: "cors",
      }
    );

    client.setHeader("Authorization", token ? `Bearer ${token}` : "");

    return client;
  }, [token]);

  return create;
}