import React, { memo, useCallback, useRef } from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TREE_ROOT_ID } from "util/consts";
import { useRecoilValue } from "recoil";
import { selectedDiagramState, selectedElementState } from "../recoil/atoms";

import { Graph } from "@antv/x6";
import { useSelectedServiceId } from "../hooks/useSelectedServiceId";
import { servicesState } from "recoil/atoms";
import { GqlServiceNode } from "./GqlServiceNode";

export const ModelTreeView = memo((props: { graph?: Graph }) => {
  const { graph } = props;
  const services = useRecoilValue(servicesState);
  const serviceId = useSelectedServiceId();
  const selectedDiagram = useRecoilValue(selectedDiagramState(serviceId));
  const selectedElement = useRecoilValue(selectedElementState(serviceId));

  const fileInputRef = useRef(null);

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
        {services.map((service) => {
          return (
            <GqlServiceNode key={service.id} service={service} graph={graph} />
          );
        })}
      </TreeView>
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
