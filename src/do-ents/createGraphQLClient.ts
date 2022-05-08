import { GraphQLClient } from "graphql-request";
import { SERVER_URL } from "util/consts";

export function createGraphQLClient(server?:string) {
  return new GraphQLClient(server||SERVER_URL, {
    mode: "cors",
  });
}
