import TreeItem from "@mui/lab/TreeItem";
import { TREE_ROOT_ID } from "util/consts";
import { TreeNodeLabel } from "./TreeNodeLabel";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import { useSelectedServiceId } from "../hooks/useSelectedServiceId";
import { NodeText } from "./NodeText";
import { ClassNode } from "./ClassNode";
import intl from "react-intl-universal";
import { memo } from "react";
import { Graph } from "@antv/x6";
import { useExternalClasses } from "../hooks/useExternalClasses";

export const ExternalClasses = memo((props: { graph?: Graph }) => {
  const { graph } = props;
  const serviceId = useSelectedServiceId();
  const services = useExternalClasses(serviceId);

  return services.length > 0 ? (
    <TreeItem
      nodeId={TREE_ROOT_ID + "EXTERNALS"}
      label={
        <TreeNodeLabel>
          <FolderOutlinedIcon />
          <NodeText>{intl.get("external-classes")}</NodeText>
        </TreeNodeLabel>
      }
    >
      {services.map((entity) => {
        return <ClassNode key={entity.uuid} uuid={entity.uuid} graph={graph} />;
      })}
    </TreeItem>
  ) : (
    <></>
  );
});
