import { ClassMeta, StereoType } from "../meta/ClassMeta";
import { RelationType } from "../meta/RelationMeta";

export function canStartLink(lineType: RelationType, classMeta: ClassMeta) {
  if (classMeta.stereoType === StereoType.Partial && lineType == RelationType.INHERIT) {
    return false
  } else if (
    lineType &&
    classMeta.stereoType !== StereoType.Enum &&
    classMeta.stereoType !== StereoType.ValueObject
  ) {
    return true;
  } else if (classMeta.stereoType === StereoType.ValueObject) {
    if (
      lineType === RelationType.ONE_WAY_AGGREGATION ||
      lineType === RelationType.ONE_WAY_ASSOCIATION ||
      lineType === RelationType.ONE_WAY_COMBINATION
    ) {
      return true;
    }
  }
  return false;
}
