import { EntityNameMeta, Meta } from "components/ModelBoard/meta/Meta";
import {
  classesState,
  diagramsState,
  metaState,
  relationsState,
  x6EdgesState,
  x6NodesState,
} from "components/ModelBoard/recoil/atoms";
import { gql } from "graphql-request";
import { GraphQLError } from "graphql-request/dist/types";
import { useSelectedService } from "hooks/useSelectedService";
import { useMemo, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { selectedServiceIdState } from "recoil/atoms";
import { useQueryOne } from "./useQueryOne";

export function useReadMeta(): { error?: GraphQLError; loading?: boolean } {
  const serviceId = useRecoilValue(selectedServiceIdState);
  const selecedService = useSelectedService();
  const setMeta = useSetRecoilState(metaState(serviceId));
  const setEntities = useSetRecoilState(classesState(serviceId));
  const setRelations = useSetRecoilState(relationsState(serviceId));
  const setDiagrams = useSetRecoilState(diagramsState(serviceId));
  const setX6Nodes = useSetRecoilState(x6NodesState(serviceId));
  const setX6Edges = useSetRecoilState(x6EdgesState(serviceId));

  const queryName = useMemo(() => "one" + EntityNameMeta, []);
  const queryGql = useMemo(() => {
    return gql`
    query ${queryName} {
      ${queryName}{
        id
        content
        status
      }
    }
  `;
  }, [queryName]);
  const { data, error, loading } = useQueryOne<Meta>(
    selecedService?.url ? queryGql : "",
    selecedService?.url
  );
  useEffect(() => {
    if (data) {
      const meta = data[queryName];
      setMeta(meta);
      setEntities(meta?.content?.classes || []);
      setRelations(meta?.content?.relations || []);
      setDiagrams(meta?.content?.diagrams || []);
      setX6Nodes(meta?.content?.x6Nodes || []);
      setX6Edges(meta?.content?.x6Edges || []);
    }
  }, [
    data,
    queryName,
    setDiagrams,
    setEntities,
    setMeta,
    setRelations,
    setX6Edges,
    setX6Nodes,
  ]);

  return { error, loading };
}
