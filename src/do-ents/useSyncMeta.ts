import { Meta } from "components/ModelBoard/meta/Meta";
import { ClientError, gql } from "graphql-request";
import { useCallback, useState } from "react";
import { useCreateGQLClient } from "./useCreateGQLClient";
import { ServerError } from "./ServerError";
import { IPostOptions } from "./usePostOne";
import { parseErrorMessage } from "./parseErrorMessage";

export function useSyncMeta(
  options?: IPostOptions<Meta>
): [
  () => void,
  { loading: boolean; error: ServerError | undefined }
] {
  //const { noRefresh, ...axioOptions } = useMemo(() => options || {}, [options]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ServerError | undefined>();
  //const postedDataRef = useRef<any>();
  const createClient = useCreateGQLClient()

  const syncMeta = useCallback(
    () => {
      const graphQLClient = createClient();
      const postMutation = gql`
        mutation syncMeta {
          syncMeta{
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
          options?.onCompleted && options?.onCompleted(data["syncMeta"]);
        })
        .catch((err: ClientError) => {
          const message = parseErrorMessage(err);
          setLoading(false);
          const serverError: ServerError = {
            message: message,
            serverUrl: options?.serverUrl,
          };
          setError(serverError);
          console.error(err);
          error && options?.onError && options?.onError(serverError);
        });
    },
    [createClient, error, options]
  );

  return [syncMeta, { loading, error }];
}
