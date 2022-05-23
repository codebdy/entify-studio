import { CONST_ID } from "components/ModelBoard/meta/Meta";
import { ClientError, gql } from "graphql-request";
import { useCallback, useState } from "react";
import { createGraphQLClient } from "./createGraphQLClient";
import { ServerError } from "./ServerError";

export interface IPostOptions<T> {
  onCompleted?: (data: T) => void;
  onError?: (error: ServerError) => void;
  noRefresh?: boolean;
}

export function usePostOne<T>(
  __type: string,
  options?: IPostOptions<T>
): [
  (data: T, serverUrl?: string) => void,
  { loading?: boolean; error?: ServerError }
] {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ServerError | undefined>();

  const post = useCallback(
    (object: T, serverUrl?: string) => {
      const graphQLClient = createGraphQLClient(serverUrl);
      const postName = "upsertOne" + __type;
      const typeName = __type + "Input";
      const postMutation = gql`
        mutation ${postName} ($object: ${typeName}!) {
          ${postName}(object: $object){
            id
            ${Object.keys(object)
              .filter((key) => key !== CONST_ID && key !== "__type")
              .join("\n")}
          }
        }
      `;

      setLoading(true);
      setError(undefined);
      graphQLClient
        .request(postMutation, { object })
        .then((data) => {
          setLoading(false);
          options?.onCompleted && options?.onCompleted(data[postName]);
        })
        .catch((err: ClientError) => {
          const error: ServerError | undefined = err.response?.errors
            ? err.response.errors[0]
            : err;
          setLoading(false);
          setError(error);
          console.error(err);
          error && options?.onError && options?.onError(error);
        });
    },
    [__type, options]
  );

  return [post, { loading, error }];
}
