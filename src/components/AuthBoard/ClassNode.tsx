import {
  CircularProgress,
  FormControlLabel,
  Grid,
  SvgIcon,
  Switch,
  Theme,
  useTheme,
} from "@mui/material";
import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";
import { TreeItem } from "@mui/lab";
import { ClassMeta } from "components/ModelBoard/meta/ClassMeta";
import { ActionLabel } from "./ActionLabel";
import { AbilityActions } from "./AbilityActions";
import { NodeLabel } from "./NodeLabel";
import { AttributeNode } from "./ColumnNode";
import { ExpressArea } from "./ExpressArea";
import { memo, useMemo, useState } from "react";
import intl from "react-intl-universal";
import { createId } from "util/createId";
import { EntityAuthSettings } from "./meta/EntityAuthSettings";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    actionArea: {
      display: "flex",
    },
    nodeName: {
      display: "flex",
      alignItems: "center",
    },
    columnOrRelation: {
      fontSize: "0.9rem",
      padding: theme.spacing(0.8, 0),
    },
  })
);

export const ClassNode = memo(
  (props: {
    entityMeta: ClassMeta;
    entityAuth?: EntityAuthSettings;
    entityAuths: EntityAuthSettings[];
  }) => {
    const { entityMeta, entityAuth, entityAuths } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [hover, setHover] = useState(false);
    // const [excutePost, { loading, error }] = useLazyMagicPost({
    //   onCompleted(data: any) {
    //     mutate(ENTITY_AUTH_QUERY.toUrl(), {
    //       data: [
    //         ...entityAuths.filter(
    //           (entithAth) => entithAth.entityUuid !== entityAuth?.entityUuid
    //         ),
    //         data.RxEntityAuthSettings,
    //       ],
    //     });
    //   },
    // });

    //useShowServerError(error);

    const hanldeExpandChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      // const auth = entityAuth
      //   ? entityAuth
      //   : { uuid: createId(), entityUuid: entityMeta.uuid };
      // const data = new MagicPostBuilder()
      //   .setEntity("RxEntityAuthSettings")
      //   .setSingleData({ ...auth, expand: event.target.checked })
      //   .toData();
      // excutePost({ data });
    };

    return (
      <TreeItem
        nodeId={entityMeta.uuid}
        label={
          <NodeLabel
            onMouseOver={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <div className={classes.nodeName}>
              <SvgIcon>
                <path
                  d=" M 1,6 L 14,6 L 14,19 L 1,19 L 1,6  M 1,11 L 14,11"
                  stroke={theme.palette.text.primary}
                  strokeWidth="1"
                  fill="transparent"
                ></path>
              </SvgIcon>
              {entityMeta.name}
            </div>
            <div
              className={classes.actionArea}
              onClick={(e) => e.stopPropagation()}
            >
              <ExpressArea>
                <Grid item xs={6}>
                  {(hover || entityAuth?.expand) && (
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
            </div>
          </NodeLabel>
        }
      >
        {entityAuth?.expand &&
          entityMeta.attributes.map((column) => {
            return column.name !== "id" ? (
              <AttributeNode
                key={column.uuid}
                entityMeta={entityMeta}
                columnMeta={column}
              />
            ) : undefined;
          })}
      </TreeItem>
    );
  }
);
