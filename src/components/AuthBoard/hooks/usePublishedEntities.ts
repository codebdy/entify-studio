import { usePublishedMeta } from "components/ModelBoard/hooks/usePublishedMeta";
import { StereoType } from "components/ModelBoard/meta/ClassMeta";
import { useMemo } from "react";

export function usePublishedEntities(){
  const {meta, error, loading} = usePublishedMeta()

  const entities = useMemo(()=>{
    return meta?.content?.classes?.filter((cls)=>cls.stereoType === StereoType.Entity)
  }, [meta?.content?.classes])

  return {entities, loading, error}
}
