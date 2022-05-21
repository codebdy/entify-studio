import TreeItem from "@mui/lab/TreeItem";
import { TREE_ROOT_ID } from "util/consts";
import { TreeNodeLabel } from "./TreeNodeLabel";
import { useSelectedServiceId } from "../hooks/useSelectedServiceId";
import { NodeText } from "./NodeText";
import { ClassNode } from "./ClassNode";
import intl from "react-intl-universal";
import { memo } from "react";
import { Graph } from "@antv/x6";
import { useExternalClasses } from "../hooks/useExternalClasses";
import { SvgIcon } from "@mui/material";

export const ExternalClasses = memo((props: { graph?: Graph }) => {
  const { graph } = props;
  const serviceId = useSelectedServiceId();
  const services = useExternalClasses(serviceId);

  return services.length > 0 ? (
    <TreeItem
      nodeId={TREE_ROOT_ID + "EXTERNALS"}
      label={
        <TreeNodeLabel>
          <SvgIcon>
            <path
              fill="currentColor"
              d="M15 20C15 19.45 14.55 19 14 19H13V17H19C20.11 17 21 16.11 21 15V7C21 5.9 20.11 5 19 5H13L11 3H5C3.9 3 3 3.9 3 5V15C3 16.11 3.9 17 5 17H11V19H10C9.45 19 9 19.45 9 20H2V22H9C9 22.55 9.45 23 10 23H14C14.55 23 15 22.55 15 22H22V20H15M5 15V7H19V15H5Z"
            />
          </SvgIcon>
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
