import { useQueryOne } from "do-ents/useQueryOne";
import { gql } from "graphql-request";
import { useMemo } from "react";
import { EntityNameMeta, Meta } from "../meta/Meta";
import { useSelectedService } from "./useSelectedService";

export function usePublishedMeta() {
  const selecedService = useSelectedService();
  const queryName = useMemo(() => "one" + EntityNameMeta, []);

  const queryPubishedGql = useMemo(() => {
    return gql`
    query ${queryName} {
      ${queryName}(where:{
        status:{
          _eq:published
        }
      }){
        id
        content
      }
    }
  `;
  }, [queryName]);

  const { data, error, loading } = useQueryOne<Meta>(
    queryPubishedGql,
    selecedService?.url
  );

  const meta = useMemo(() => (data ? data[queryName] : undefined), [data, queryName]);
  return { meta, error, loading };
}
