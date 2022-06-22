import { useCallback } from "react";
import { useCreateNewClass } from "./useCreateNewClass";
import { NODE_INIT_SIZE } from "../GraphCanvas/nodeInitSize";
import { StereoType } from "../meta/ClassMeta";

export function useCreateTempClassNodeForNew(serviceId: number) {
  const creatNewClassMeta = useCreateNewClass(serviceId);
  const createTempClassNodeForNew = useCallback(
    (stereoType: StereoType) => {
      const classMeta = creatNewClassMeta(stereoType);
      if (
        stereoType === StereoType.ValueObject ||
        stereoType === StereoType.External ||
        stereoType === StereoType.Enum
      ) {
        classMeta.methods = [];
      }
      return {
        uuid: "entityMeta.uuid",
        ...NODE_INIT_SIZE,

        shape: "react-shape",
        data: {
          ...classMeta,
          root: stereoType === StereoType.Partial,
          isTempForNew: true,
        },
      };
    },
    [creatNewClassMeta]
  );
  return createTempClassNodeForNew;
}
