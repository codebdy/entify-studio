import { ClientError } from "graphql-request/dist/types";
import { useCallback, useState } from "react";
import { useCreateGQLClient } from "./useCreateGQLClient";
import { ServerError } from "./ServerError";
import { parseErrorMessage } from "./parseErrorMessage";
import { Service } from "components/ModelBoard/meta/Service";

const serviceField = "_service";

const gql = `
  query{
    ${serviceField}{
      installed
      canUpload
    }
  }
`;

export function useServiceCheck(onComplete?:(service?:Service)=>void): [
  (serverUrl: string) => void,
  {
    installed?: boolean;
    canUpload?: boolean;
    loading?: boolean;
    error?: ServerError;
  }
] {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ServerError>();
  const [installed, setInstalled] = useState<boolean>();
  const [canUpload, setCanUpload] = useState<boolean>();
  const createClient = useCreateGQLClient();

  const check = useCallback(
    (serverUrl: string) => {
      const graphQLClient = createClient(serverUrl);

      setLoading(true);
      setError(undefined);
      graphQLClient
        .request(gql)
        .then((data) => {
          setLoading(false);
          if (data) {
            setInstalled(data[serviceField]?.installed);
            setCanUpload(data[serviceField]?.canUpload);
            onComplete && onComplete(data[serviceField])
          }
        })
        .catch((err: ClientError) => {
          const message = parseErrorMessage(err);
          setLoading(false);
          const serverError: ServerError = {
            message: message,
            serverUrl
          };
          setError(serverError);
          console.error(err);

        });
    },
    [createClient, onComplete]
  );

  return [
    check,
    {
      installed,
      canUpload: canUpload,
      loading,
      error,
    },
  ];
}
