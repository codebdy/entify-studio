import React, { memo, useCallback, useRef, useState } from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TREE_ROOT_ID } from "util/consts";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { selectedDiagramState, selectedElementState } from "../recoil/atoms";
import { Classes } from "./Classes";
import { Graph } from "@antv/x6";
import { TreeItem } from "@mui/lab";
import { TreeNodeLabel } from "./TreeNodeLabel";
import { RootMenu } from "./RootMenu";
import { NodeText } from "./NodeText";
import { diagramsState } from "../recoil/atoms";
import { CircularProgress, IconButton, SvgIcon } from "@mui/material";
import { Enums } from "./Enums";
import { ValueObjects } from "./ValueObjects";
import { ExternalClasses } from "./ExternalClasses";
import { DiagramNode } from "./DiagramNode";
import intl from "react-intl-universal";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { refreshServicesState, selectedServiceIdState } from "recoil/atoms";
import { useShowServerError } from "hooks/useShowServerError";
import { useRemoveService } from "do-ents/useRemoveService";

export const ModelTreeView = memo((props: { graph?: Graph }) => {
  const { graph } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const setRefresh = useSetRecoilState(refreshServicesState);
  const [selectedServiceId, setSelectedServiceId] = useRecoilState(
    selectedServiceIdState
  );
  const selectedDiagram = useRecoilValue(
    selectedDiagramState(selectedServiceId)
  );
  const selectedElement = useRecoilValue(
    selectedElementState(selectedServiceId)
  );
  const diagrams = useRecoilValue(diagramsState(selectedServiceId));
  const fileInputRef = useRef(null);

  const [remove, { loading: removing, error: removeError }] = useRemoveService({
    onCompleted: (status: boolean) => {
      if (status) {
        setSelectedServiceId(0);
        setRefresh((flag) => flag + 1);
      }
    },
  });

  useShowServerError(removeError);
  const handlePackageFileInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const pacakgeFile = event.target.files
        ? event.target.files[0]
        : undefined;
      // if (pacakgeFile) {
      //   var reader = new FileReader();
      //   reader.readAsText(pacakgeFile, "utf-8");
      //   reader.onload = () => {
      //     if (!reader.result) {
      //       appStore.infoError(intl.get("package-file-illegal"));
      //       return;
      //     }
      //     const aPackage = JSON.parse(reader.result as string);
      //     if (!aPackage.uuid) {
      //       appStore.infoError(intl.get("package-file-illegal"));
      //       return;
      //     }

      //     if (rootStore.packages.find((apk) => apk.uuid === aPackage.uuid)) {
      //       appStore.infoError(intl.get("package-exist"));
      //       return;
      //     }
      //     const command = new PackageCreateCommand(
      //       new PackageStore(aPackage, rootStore),
      //       rootStore
      //     );
      //     rootStore.excuteCommand(command);
      //   };
      // }
    },
    []
  );

  const handleMenuOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    event.stopPropagation();
  }, []);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleDelete = useCallback(() => {
    selectedServiceId && remove(selectedServiceId);
  }, [remove, selectedServiceId]);

  return (
    <>
      <TreeView
        defaultCollapseIcon={
          <ExpandMoreIcon
            sx={{ color: (theme) => theme.palette.text.primary }}
          />
        }
        defaultExpanded={[TREE_ROOT_ID]}
        defaultExpandIcon={
          <ChevronRightIcon
            sx={{ color: (theme) => theme.palette.text.primary }}
          />
        }
        selected={[selectedDiagram || "", selectedElement || ""]}
        sx={{
          "& .MuiTreeItem-content": {
            padding: 0,
          },
        }}
      >
        <TreeItem
          nodeId={"node_" + selectedServiceId}
          label={
            <TreeNodeLabel
              fixedAction={true}
              action={
                removing ? (
                  <CircularProgress size={18} />
                ) : (
                  <IconButton
                    size="small"
                    onClick={handleMenuOpen}
                  >
                    <MoreVertOutlinedIcon fontSize="small" />
                  </IconButton>
                )
              }
            >
              <SvgIcon>
                <path
                  fill="currentColor"
                  d="M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L6.04,7.5L12,10.85L17.96,7.5L12,4.15M5,15.91L11,19.29V12.58L5,9.21V15.91M19,15.91V9.21L13,12.58V19.29L19,15.91Z"
                />
              </SvgIcon>
              <NodeText>{intl.get("domain-models")}</NodeText>
            </TreeNodeLabel>
          }
        >
          <Classes graph={graph} />
          <Enums graph={graph} />
          <ValueObjects graph={graph} />
          <ExternalClasses graph={graph} />
          {diagrams.map((diagram) => {
            return <DiagramNode key={diagram.uuid} diagram={diagram} />;
          })}
        </TreeItem>
      </TreeView>
      <RootMenu
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        onDelete={handleDelete}
      />
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        style={{ display: "none" }}
        onChange={handlePackageFileInputChange}
      />
    </>
  );
});
