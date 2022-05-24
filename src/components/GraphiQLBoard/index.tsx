import { Box } from "@mui/material";
import GraphiQL from "graphiql";
import "graphiql/graphiql.css";
import "./graphiql-dark-mode.css";
import { SERVER_URL, SERVER_SUBSCRIPTION_URL, TOKEN_PREFIX, AUTHORIZATION } from "util/consts";
import { createGraphiQLFetcher } from "@graphiql/toolkit";
import { memo, useMemo } from "react";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { useSelectedService } from "components/ModelBoard/hooks/useSelectedService";
import { useToken } from "hooks/useToken";

//例子連接
//https://github.com/graphql/graphiql/blob/main/packages/graphiql-toolkit/docs/create-fetcher.md#subscriptionurl
export const GraphiQLBoard = memo(() => {
  const service = useSelectedService();
  const token = useToken();
  const fetcher = useMemo(() => {
    const fetcher = createGraphiQLFetcher({
      url: service?.url || SERVER_URL,
      legacyWsClient: new SubscriptionClient(SERVER_SUBSCRIPTION_URL),
      headers:{
        [AUTHORIZATION]: token ? `${TOKEN_PREFIX}${token}` :""
      }
    });

    return fetcher;
  }, [service?.url, token]);
  
  return (
    <Box
      sx={{
        height: "100%",
      }}
    >
      {fetcher && (
        <GraphiQL
          headerEditorEnabled
          fetcher={fetcher}
          // query=""
        />
      )}
    </Box>
  );
});
