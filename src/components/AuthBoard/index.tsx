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
import { useSelectedRole } from "./hooks/useSelectedRole";
import { useInitAuth } from "./hooks/useInitAuth";
import { useShowServerError } from "hooks/useShowServerError";
import Loading from "components/common/loading";

export const AuthBoard = memo(() => {
  const scrollStyles = useChildrenScrollStyles();
  const selectedServie = useSelectedService();
  const selectedServiceId = useSelectedServiceId();
  const selectedRole = useSelectedRole();
  const [entityAuths, setEntityAuths] = useState<EntityAuthSettings[]>([]);
  const entities = useEntities(selectedServiceId);

  const { loading, error } = useInitAuth();
  useShowServerError(error);
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
      {loading ? (
        <Loading />
      ) : (
        selectedRole && (
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexFlow: "column",
              height: "100%",
            }}
          >
            <Topbar />
            <Box
              sx={{
                flex: 1,
                overflow: "auto",
                height: 0,
                p: 2,
                pr: 4,
              }}
            >
              <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                selected=""
              >
                {entities.map((entity) => {
                  return <ClassNode key={entity.uuid} entityMeta={entity} />;
                })}
              </TreeView>
            </Box>
          </Box>
        )
      )}
    </Box>
  ) : (
    <></>
  );
});
