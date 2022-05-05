import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { StereoType } from "../meta/ClassMeta";
import { classesState } from "../recoil/atoms";

export function useValueObjects(serviceId: number) {
  const classes = useRecoilValue(classesState(serviceId));
  const valueObjs = useMemo(() => {
    return classes.filter((cls) => cls.stereoType === StereoType.ValueObject);
  }, [classes]);

  return valueObjs;
}
