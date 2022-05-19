import { Classes } from "./Classes";
import { Enums } from "./Enums";
import { ValueObjects } from "./ValueObjects";
import { ServiceClasses } from "./ServiceClasses";
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

export const GqlServiceNode = memo(
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
              <path fill="currentColor" d="M4.93,4.93C3.12,6.74 2,9.24 2,12C2,14.76 3.12,17.26 4.93,19.07L6.34,17.66C4.89,16.22 4,14.22 4,12C4,9.79 4.89,7.78 6.34,6.34L4.93,4.93M19.07,4.93L17.66,6.34C19.11,7.78 20,9.79 20,12C20,14.22 19.11,16.22 17.66,17.66L19.07,19.07C20.88,17.26 22,14.76 22,12C22,9.24 20.88,6.74 19.07,4.93M7.76,7.76C6.67,8.85 6,10.35 6,12C6,13.65 6.67,15.15 7.76,16.24L9.17,14.83C8.45,14.11 8,13.11 8,12C8,10.89 8.45,9.89 9.17,9.17L7.76,7.76M16.24,7.76L14.83,9.17C15.55,9.89 16,10.89 16,12C16,13.11 15.55,14.11 14.83,14.83L16.24,16.24C17.33,15.15 18,13.65 18,12C18,10.35 17.33,8.85 16.24,7.76M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10Z" />
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
        <ServiceClasses graph={graph} />
      </TreeItem>
    );
  }
);
