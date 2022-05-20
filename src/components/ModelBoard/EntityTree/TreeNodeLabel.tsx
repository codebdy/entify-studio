import { Box } from "@mui/material";
import { useState } from "react";
import { NodeAction } from "./NodeAction";

export function TreeNodeLabel(props: {
  children: any;
  action?: any;
  onClick?: (event: React.MouseEvent) => void;
  onDragStart?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  color?: string;
  italic?: boolean;
  fixedAction?: boolean;
}) {
  const { action, children, onClick, onDragStart, color, italic, fixedAction } =
    props;
  const [hover, setHover] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "5px 0",
        position: "relative",
        userSelect: "none",
        color: color || ((theme) => theme.palette.text.primary),
        fontStyle: italic ? "italic" : undefined,
      }}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      onDragStart={onDragStart}
      draggable
    >
      {children}
      {(hover || fixedAction) && <NodeAction>{action}</NodeAction>}
    </Box>
  );
}
