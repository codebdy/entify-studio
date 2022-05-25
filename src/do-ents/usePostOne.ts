import { CONST_ID } from "components/ModelBoard/meta/Meta";
import { ClientError, gql } from "graphql-request";
import { useCallback, useState } from "react";
import { useCreateGQLClient } from "./useCreateGQLClient";
import { ServerError } from "./ServerError";
import { parseErrorMessage } from "./parseErrorMessage";

export interface IPostOptions<T> {
  onCompleted?: (data: T) => void;
  onError?: (error: ServerError) => void;
  noRefresh?: boolean;
  serverUrl?:string;
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
  const createClient = useCreateGQLClient();

  const post = useCallback(
    (object: T, serverUrl?: string) => {
      const graphQLClient = createClient(serverUrl);
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
          const message = parseErrorMessage(err);
          setLoading(false);
          const serverError: ServerError = {
            message: message,
            serverUrl: serverUrl,
          };
          setError(serverError);
          console.error(err);
          error && options?.onError && options?.onError(serverError);
        });
    },
    [__type, createClient, error, options]
  );

  return [post, { loading, error }];
}
