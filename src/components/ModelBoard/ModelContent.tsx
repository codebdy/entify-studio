import { memo, useEffect, useMemo } from "react";
import { useChildrenScrollStyles } from "theme/useChildrenScrollStyles";
import { Graph } from "@antv/x6";
import { GraphCanvas } from "./GraphCanvas";
import { ModelToolbar } from "./ModelToolbar";
import { Box } from "@mui/material";
import { Toolbox } from "./Toolbox";
import EmpertyCanvas from "./EmpertyCanvas";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  minMapState,
  publishedIdState,
  selectedDiagramState,
} from "./recoil/atoms";
import { useQueryOne } from "do-ents/useQueryOne";
import { EntityNameMeta, Meta } from "./meta/Meta";
import { useShowServerError } from "hooks/useShowServerError";
import { gql } from "graphql-request";
import { PropertyBox } from "./PropertyBox";
import { selectedServiceIdState } from "recoil/atoms";
import { useSelectedService } from "./hooks/useSelectedService";

export const ModelContent = memo(
  (props: { graph?: Graph; onSetGraph: (graph?: Graph) => void }) => {
    const { graph, onSetGraph } = props;
    const scrollStyles = useChildrenScrollStyles();
    const serviceId = useRecoilValue(selectedServiceIdState);
    const selecedService = useSelectedService();
    const setPublishedId = useSetRecoilState(publishedIdState(serviceId));
    const selectedDiagram = useRecoilValue(selectedDiagramState(serviceId));
    const minMap = useRecoilValue(minMapState(serviceId));
    const queryName = useMemo(() => "one" + EntityNameMeta, []);

    const queryPubishedGql = useMemo(() => {
      return gql`
      query ${queryName} {
        ${queryName}(where:{
          status:{
            _eq:published
          }
        }){
          id
        }
      }
    `;
    }, [queryName]);

    const {
      data: publishedData,
      error: publishedError,
      loading: publishedLoading,
    } = useQueryOne<Meta>(queryPubishedGql, selecedService?.url);
    useShowServerError(publishedError);
    useEffect(() => {
      const meta = publishedData ? publishedData[queryName] : undefined;
      setPublishedId(meta?.id || undefined);
    }, [publishedData, queryName, setPublishedId]);

    return (
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexFlow: "column",
        }}
      >
        <ModelToolbar />
        <Box sx={{ width: "100%", flex: 1, display: "flex", height: "0" }}>
          {selectedDiagram ? (
            <>
              <Toolbox graph={graph}></Toolbox>
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  ...scrollStyles,
                }}
              >
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexFlow: "column",
                    overflow: "auto",
                    position: "relative",
                    "& .x6-widget-minimap": {
                      backgroundColor: (theme) =>
                        theme.palette.background.paper,
                      "& .x6-graph": {
                        boxShadow: (theme) => theme.shadows[0],
                      },
                    },
                  }}
                >
                  <GraphCanvas
                    graph={graph}
                    onSetGraph={onSetGraph}
                  ></GraphCanvas>
                  <Box
                    sx={{
                      position: "absolute",
                      zIndex: 1,
                      bottom: 3,
                      left: 3,
                      width: 140,
                      height: 110,
                      borderRadius: "5px",
                      overflow: "hidden",
                      display: minMap ? "block" : "none",
                      border: (theme) => `solid 2px ${theme.palette.divider}`,
                      boxShadow: 5,
                    }}
                    id="mini-map"
                  ></Box>
                </Box>
              </Box>
            </>
          ) : (
            <EmpertyCanvas></EmpertyCanvas>
          )}
          <PropertyBox></PropertyBox>
        </Box>
      </Box>
    );
  }
);
