import { GraphQLClient } from "graphql-request";
import { useToken } from "hooks/useToken";
import { useCallback } from "react";
import { AUTHORIZATION, SERVER_URL, TOKEN_PREFIX } from "util/consts";

export function useCreateGQLClient() {
  const token = useToken();
  const create = useCallback((server?: string) => {
    const client = new GraphQLClient(
      server === undefined ? SERVER_URL : server,
      {
        mode: "cors",
      }
    );

    client.setHeader(AUTHORIZATION, token ? `${TOKEN_PREFIX}${token}` : "");

    return client;
  }, [token]);

  return create;
}