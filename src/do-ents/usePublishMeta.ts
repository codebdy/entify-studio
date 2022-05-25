import { Meta } from "components/ModelBoard/meta/Meta";
import { ClientError, gql } from "graphql-request";
import { useCallback, useState } from "react";
import { useCreateGQLClient } from "./useCreateGQLClient";
import { ServerError } from "./ServerError";
import { IPostOptions } from "./usePostOne";
import { parseErrorMessage } from "./parseErrorMessage";

export function usePublishMeta(
  options?: IPostOptions<Meta>
): [
  (serverUrl: string | undefined) => void,
  { loading: boolean; error: ServerError | undefined }
] {
  //const { noRefresh, ...axioOptions } = useMemo(() => options || {}, [options]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ServerError | undefined>();
  const createClient = useCreateGQLClient();

  const publish = useCallback(
    (serverUrl: string | undefined) => {
      const graphQLClient = createClient(serverUrl);
      const postMutation = gql`
        mutation publish {
          publish {
            id
          }
        }
      `;

      setLoading(true);
      setError(undefined);
      graphQLClient
        .request(postMutation)
        .then((data) => {
          setLoading(false);
          options?.onCompleted && options?.onCompleted(data["publish"]);
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
    [createClient, error, options]
  );

  return [publish, { loading, error }];
}
