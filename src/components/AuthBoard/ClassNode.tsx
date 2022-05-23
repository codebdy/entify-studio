import {
  Box,
  CircularProgress,
  FormControlLabel,
  Grid,
  SvgIcon,
  Switch,
  useTheme,
} from "@mui/material";
import { TreeItem } from "@mui/lab";
import { ClassMeta } from "components/ModelBoard/meta/ClassMeta";
import { ActionLabel } from "./ActionLabel";
import { AbilityActions } from "./AbilityActions";
import { NodeLabel } from "./NodeLabel";
import { AttributeNode } from "./ColumnNode";
import { ExpressArea } from "./ExpressArea";
import { memo, useCallback, useState } from "react";
import intl from "react-intl-universal";
import { useEntityAuthSetting } from "./hooks/useEntityAuthSetting";
import { useSetEntityAuthSetting } from "./hooks/useSetEntityAuthSetting";
import { useShowServerError } from "hooks/useShowServerError";
import { EntityAuthSettings } from "./meta/EntityAuthSettings";

export const ClassNode = memo((props: { entityMeta: ClassMeta }) => {
  const { entityMeta } = props;
  const theme = useTheme();
  const [hover, setHover] = useState(false);
  const entityAuth = useEntityAuthSetting(entityMeta.uuid);
  const [set, { loading, error }] = useSetEntityAuthSetting();
  useShowServerError(error);

  const hanldeExpandChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const auth: EntityAuthSettings = entityAuth
        ? entityAuth
        : { entityUuid: entityMeta.uuid };
      set({ ...auth, expand: event.target.checked });
    },
    [entityAuth, entityMeta.uuid, set]
  );

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <TreeItem
      nodeId={entityMeta.uuid}
      label={
        <NodeLabel
          onMouseOver={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <SvgIcon>
              <path
                d=" M 1,6 L 14,6 L 14,19 L 1,19 L 1,6  M 1,11 L 14,11"
                stroke={theme.palette.text.primary}
                strokeWidth="1"
                fill="transparent"
              ></path>
            </SvgIcon>
            {entityMeta.name}
          </Box>
          <Box
            sx={{
              display: "flex",
            }}
            onClick={handleClick}
          >
            <ExpressArea>
              <Grid item xs={6}>
                {loading && <CircularProgress size={20} />}
                {(hover || entityAuth?.expand) && !loading && (
                  <FormControlLabel
                    control={
                      <Switch
                        color="primary"
                        size="small"
                        checked={entityAuth?.expand || false}
                        onChange={hanldeExpandChange}
                      />
                    }
                    label={<ActionLabel>{intl.get("expand")}</ActionLabel>}
                  />
                )}
              </Grid>
            </ExpressArea>
            {<AbilityActions entityMeta={entityMeta} />}
          </Box>
        </NodeLabel>
      }
    >
      {entityAuth?.expand &&
        entityMeta.attributes.map((column) => {
          return column.name !== "id" &&
            !column.createDate &&
            !column.updateDate &&
            !column.deleteDate ? (
            <AttributeNode
              key={column.uuid}
              entityMeta={entityMeta}
              columnMeta={column}
            />
          ) : undefined;
        })}
    </TreeItem>
  );
});
