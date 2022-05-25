import { ClientError, GraphQLError } from "graphql-request/dist/types";

export function parseErrorMessage(err: ClientError) {
  const error: GraphQLError | undefined = err.response?.errors
    ? err.response.errors[0]
    : err;
  const message = err.response?.error ? err.response?.error : error?.message;

  return message;
}
