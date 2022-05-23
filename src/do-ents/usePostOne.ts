import { CONST_ID } from "components/ModelBoard/meta/Meta";
import { ClientError, gql } from "graphql-request";
import { useCallback, useState } from "react";
import { createGraphQLClient } from "./createGraphQLClient";
import { IObject } from "./IObject";
import { ServerError } from "./ServerError";

export interface IPostOptions<T extends IObject> {
  onCompleted?: (data: T) => void;
  onError?: (error: ServerError) => void;
  noRefresh?: boolean;
}

export function usePostOne<T extends IObject>(
  options?: IPostOptions<T>
): [
  (data: T, serverUrl?: string) => void,
  { loading?: boolean; error?: ServerError }
] {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ServerError | undefined>();

  const post = useCallback(
    (data: T, serverUrl?: string) => {
      const { __type, ...object } = data;
      const graphQLClient = createGraphQLClient(serverUrl);
      const postName = "upsertOne" + data.__type;
      const typeName = data.__type + "Input";
      const postMutation = gql`
        mutation ${postName} ($object: ${typeName}!) {
          ${postName}(object: $object){
            id
            ${Object.keys(data)
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
    [options]
  );

  return [post, { loading, error }];
}
