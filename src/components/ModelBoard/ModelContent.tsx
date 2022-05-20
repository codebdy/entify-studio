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
  diagramsState,
  classesState,
  metaState,
  minMapState,
  publishedIdState,
  relationsState,
  selectedDiagramState,
  x6EdgesState,
  x6NodesState,
} from "./recoil/atoms";
import { useQueryOne } from "do-ents/useQueryOne";
import { EntityNameMeta, Meta } from "./meta/Meta";
import { useShowServerError } from "hooks/useShowServerError";
import { gql } from "graphql-request";
import { PropertyBox } from "./PropertyBox";
import { selectedServiceIdState } from "recoil/atoms";

export const ModelContent = memo(
  (props: {
    graph?: Graph;
    onSetGraph: (graph?: Graph) => void;
  }) => {
    const {graph, onSetGraph } = props;
    const scrollStyles = useChildrenScrollStyles();
    const serviceId = useRecoilValue(selectedServiceIdState)
    const setMeta = useSetRecoilState(metaState(serviceId));
    const setEntities = useSetRecoilState(classesState(serviceId));
    const setRelations = useSetRecoilState(relationsState(serviceId));
    const setDiagrams = useSetRecoilState(diagramsState(serviceId));
    const setX6Nodes = useSetRecoilState(x6NodesState(serviceId));
    const setX6Edges = useSetRecoilState(x6EdgesState(serviceId));
    const setPublishedId = useSetRecoilState(publishedIdState(serviceId));
    const selectedDiagram = useRecoilValue(selectedDiagramState(serviceId));
    const minMap = useRecoilValue(minMapState(serviceId));
    const queryName = useMemo(() => "one" + EntityNameMeta, []);
    const queryGql = useMemo(() => {
      return gql`
      query ${queryName} {
        ${queryName}{
          id
          content
          status
        }
      }
    `;
    }, [queryName]);
  
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
    } = useQueryOne<Meta>(queryPubishedGql);
    const { data, error, loading } = useQueryOne<Meta>(queryGql);
    useShowServerError(error || publishedError);
    useEffect(() => {
      const meta = publishedData ? publishedData[queryName] : undefined;
      setPublishedId(meta?.id || undefined);
    }, [publishedData, queryName, setPublishedId]);

    useEffect(() => {
      if (data) {
        const meta = data[queryName];
        setMeta(meta);
        setEntities(meta?.content?.classes || []);
        setRelations(meta?.content?.relations || []);
        setDiagrams(meta?.content?.diagrams || []);
        setX6Nodes(meta?.content?.x6Nodes || []);
        setX6Edges(meta?.content?.x6Edges || []);
      }
    }, [
      data,
      queryName,
      setDiagrams,
      setEntities,
      setMeta,
      setRelations,
      setX6Edges,
      setX6Nodes,
    ]);
    
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
