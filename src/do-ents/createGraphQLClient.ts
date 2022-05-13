import { GraphQLClient } from "graphql-request";
import { SERVER_URL } from "util/consts";

export function createGraphQLClient(server?:string) {
  return new GraphQLClient(server === undefined ? SERVER_URL : server, {
    mode: "cors",
  });
}
