import React, { memo } from "react";
import { Box } from "@mui/material";
import { ModelTreeView } from "./ModelTreeView";
import { Graph } from "@antv/x6";
import { useScrollbarStyles } from "theme/useScrollbarStyles";

export const EntityTree = memo((props: { graph?: Graph }) => {
  const { graph } = props;
  const scrollStyles = useScrollbarStyles();
  return (
    <Box
      sx={{
        display: "flex",
        flexFlow: "column",
        borderRight: (theme) => `solid 1px ${theme.palette.divider}`,
        width: "280px",
      }}
    >
      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          p: 1,
          ...scrollStyles,
        }}
      >
        <ModelTreeView graph={graph} />
      </Box>
    </Box>
  );
});
