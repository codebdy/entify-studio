import React, { memo } from "react";
import { Container, Box } from "@mui/material";
import { Topbar } from "./Topbar";
import { TreeView } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useState } from "react";
import { useChildrenScrollStyles } from "theme/useChildrenScrollStyles";
import { EntityAuthSettings } from "./meta/EntityAuthSettings";
import { useSelectedService } from "components/ModelBoard/hooks/useSelectedService";

export const AuthBoard = memo(() => {
  // const [boardStore] = useState(new AuthBoardStore());
  const scrollStyles = useChildrenScrollStyles();
  const selectedServie = useSelectedService();
  const [entityAuths, setEntityAuths] = useState<EntityAuthSettings[]>([]);
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

  return (
    <Container
      sx={{
        ...scrollStyles,
      }}
      maxWidth="lg"
    >
      {selectedServie && (
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexFlow: "column",
            height: 0,
            pt: 2,
          }}
        >
          <Topbar />
          <Box
            sx={{
              flex: 1,
              border: (theme) => `${theme.palette.divider} solid 1px`,
              overflow: "auto",
              height: "0",
              marginTop: (theme) => theme.spacing(1),
              padding: (theme) => theme.spacing(2),
            }}
          >
            <TreeView
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              selected=""
            >
              {/* {data?.map((aPackage) => {
                  return (
                    <PackageNode
                      key={aPackage.uuid}
                      packageMeta={aPackage}
                      entityAuths={entityAuths}
                    />
                  );
                })} */}
            </TreeView>
          </Box>
        </Box>
      )}
    </Container>
  );
});
