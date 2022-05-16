import React, { memo, useState } from "react";
import { Box } from "@mui/material";
import { EntityTree } from "./EntityTree";
import { Graph } from "@antv/x6";
import "@antv/x6-react-shape";
import { useSelectedService } from "./hooks/useSelectedService";
import { ModelContent } from "./ModelContent";
import { ServiceType } from "./meta/Service";

export const ModelsBoard = memo(() => {
  const [graph, setGraph] = useState<Graph>();
  const selectedService = useSelectedService();

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexFlow: "row",
        height: "0",
      }}
    >
      <EntityTree graph={graph}></EntityTree>
      {(selectedService?.serviceType === ServiceType.Entify ||
        selectedService?.serviceType === ServiceType.EntifyAuth) && (
        <ModelContent onSetGraph={setGraph} serviceId={selectedService.id} />
      )}
    </Box>
  );
});
