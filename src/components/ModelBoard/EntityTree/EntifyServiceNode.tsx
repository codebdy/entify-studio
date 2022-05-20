import { Classes } from "./Classes";
import { Enums } from "./Enums";
import { ValueObjects } from "./ValueObjects";
import { ExternalClasses } from "./ExternalClasses";
import { DiagramNode } from "./DiagramNode";
import LocalModelAction from "./LocalModelAction";
import { memo } from "react";
import { NodeText } from "./NodeText";
import { Graph } from "@antv/x6";
import { TreeItem } from "@mui/lab";
import { Service } from "../meta/Service";
import { TreeNodeLabel } from "./TreeNodeLabel";
import { useRecoilValue } from "recoil";
import { diagramsState } from "../recoil/atoms";
import { SvgIcon } from "@mui/material";

export const EntifyServiceNode = memo(
  (props: { graph?: Graph; service: Service }) => {
    const { graph, service } = props;
    const diagrams = useRecoilValue(diagramsState(service.id||0));

    return (
      <TreeItem
        nodeId={"node_" + service.id}
        label={
          <TreeNodeLabel
            action={
              <LocalModelAction
                onPublish={function (): void {
                  throw new Error("Function not implemented.");
                }}
                onDownloadJson={function (): void {
                  throw new Error("Function not implemented.");
                }}
                onExportInterface={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
            }
          >
            <SvgIcon>
              <path
                fill="currentColor"
                d="M4.93,3.93C3.12,5.74 2,8.24 2,11C2,13.76 3.12,16.26 4.93,18.07L6.34,16.66C4.89,15.22 4,13.22 4,11C4,8.79 4.89,6.78 6.34,5.34L4.93,3.93M19.07,3.93L17.66,5.34C19.11,6.78 20,8.79 20,11C20,13.22 19.11,15.22 17.66,16.66L19.07,18.07C20.88,16.26 22,13.76 22,11C22,8.24 20.88,5.74 19.07,3.93M7.76,6.76C6.67,7.85 6,9.35 6,11C6,12.65 6.67,14.15 7.76,15.24L9.17,13.83C8.45,13.11 8,12.11 8,11C8,9.89 8.45,8.89 9.17,8.17L7.76,6.76M16.24,6.76L14.83,8.17C15.55,8.89 16,9.89 16,11C16,12.11 15.55,13.11 14.83,13.83L16.24,15.24C17.33,14.15 18,12.65 18,11C18,9.35 17.33,7.85 16.24,6.76M12,9A2,2 0 0,0 10,11A2,2 0 0,0 12,13A2,2 0 0,0 14,11A2,2 0 0,0 12,9M11,15V19H10A1,1 0 0,0 9,20H2V22H9A1,1 0 0,0 10,23H14A1,1 0 0,0 15,22H22V20H15A1,1 0 0,0 14,19H13V15H11Z"
              />
            </SvgIcon>
            <NodeText>{service.name}</NodeText>
          </TreeNodeLabel>
        }
      >
        {diagrams.map((diagram) => {
          return <DiagramNode key={diagram.uuid} diagram={diagram} />;
        })}
        <Classes graph={graph} />
        <Enums graph={graph} />
        <ValueObjects graph={graph} />
        <ExternalClasses graph={graph} />
      </TreeItem>
    );
  }
);
