import React, { memo } from "react";
import { Box } from "@mui/material";
import { Topbar } from "./Topbar";
import { TreeView } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useState } from "react";
import { useChildrenScrollStyles } from "theme/useChildrenScrollStyles";
import { EntityAuthSettings } from "./meta/EntityAuthSettings";
import { useSelectedService } from "components/ModelBoard/hooks/useSelectedService";
import { useEntities } from "components/ModelBoard/hooks/useEntities";
import { useSelectedServiceId } from "components/ModelBoard/hooks/useSelectedServiceId";
import { ClassNode } from "./ClassNode";
import { RoleSelectList } from "./RoleSelectList";

export const AuthBoard = memo(() => {
  const scrollStyles = useChildrenScrollStyles();
  const selectedServie = useSelectedService();
  const selectedServiceId = useSelectedServiceId();
  const [entityAuths, setEntityAuths] = useState<EntityAuthSettings[]>([]);
  const entities = useEntities(selectedServiceId);
  // const {data, loading, error} = useSWRQuery<PackageMeta[]>(API_PUSLISHED_SCHEMA);
  // const {
  //   data: authData,
  //   loading: authLoading,
  //   error: authError,
  // } = useMagicQuery<RxEntityAuthSettings[]>(ENTITY_AUTH_QUERY);

  // useEffect(() => {
  //   boardStore.setPackages(data || []);
  // }, [boardStore, data]);

  // useEffect(() => {
  //   setEntityAuths(authData?.data || []);
  // }, [authData]);

  // useShowServerError(error || authError);

  return selectedServie ? (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexFlow: "row",
        height: 0,
        color: (theme) => theme.palette.text.primary,
        ...scrollStyles,
      }}
    >
      <RoleSelectList />
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexFlow: "column",
          height: "100%",
          pr: 4,
        }}
      >
        <Topbar />
        <Box
          sx={{
            flex: 1,
            border: (theme) => `${theme.palette.divider} solid 1px`,
            borderLeft: 0,
            overflow: "auto",
            height: 0,
            padding: (theme) => theme.spacing(2),
          }}
        >
          <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            selected=""
          >
            {entities.map((entity) => {
              return (
                <ClassNode
                  key={entity.uuid}
                  entityMeta={entity}
                  entityAuths={entityAuths}
                />
              );
            })}
          </TreeView>
        </Box>
      </Box>
    </Box>
  ) : (
    <></>
  );
});
