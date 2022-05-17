import React, { memo, useEffect } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { ModelTreeView } from "./ModelTreeView";
import intl from "react-intl-universal";
import { Graph } from "@antv/x6";
import { useScrollbarStyles } from "theme/useScrollbarStyles";
import { useGQLServices } from "do-ents/useGQLServices";
import { useSetRecoilState } from "recoil";
import { servicesState } from "recoil/atoms";
import { useShowServerError } from "hooks/useShowServerError";
import { AddServiceDialog } from "./AddServiceDialog";

export const EntityTree = memo((props: { graph?: Graph }) => {
  const { graph } = props;
  const scrollStyles = useScrollbarStyles();
  const setServices = useSetRecoilState(servicesState);

  const { services, loading, error, refresh } = useGQLServices();

  useShowServerError(error);

  useEffect(() => {
    setServices(services || []);
  }, [services, setServices]);

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
          height: (theme) => theme.spacing(6),
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: (theme) => theme.palette.divider + " solid 1px",
          pl: 2,
          pr: 2,
        }}
      >
        <Typography sx={{ color: (theme) => theme.palette.text.primary }}>
          {intl.get("services")}
        </Typography>
        <AddServiceDialog />
      </Box>
      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          p: 1,
          ...scrollStyles,
        }}
      >
        {loading ? <CircularProgress /> : <ModelTreeView graph={graph} />}
      </Box>
    </Box>
  );
});
