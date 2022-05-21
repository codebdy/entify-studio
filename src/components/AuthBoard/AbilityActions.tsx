import { Theme, Grid } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import createStyles from "@mui/styles/createStyles";
import classNames from "classnames";
import { ActionWithExpression } from "./ActionWithExpression";
import intl from "react-intl-universal";
import { ClassMeta } from "components/ModelBoard/meta/ClassMeta";
import { Ability } from "components/AuthBoard/meta/Ability";
import { memo } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authChangedState } from "./recoil/atoms";
import { AbilityType } from "./meta/AbilityType";
import { useSelectedServiceId } from "components/ModelBoard/hooks/useSelectedServiceId";
import { useSelectedRole } from "./recoil/hooks/useSelectedRole";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "600px",
    },
    actionGrid: {
      width: "25%",
      display: "flex",
      alignItems: "center",
    },
    createGrid: {
      width: "20%",
    },
  })
);

export const AbilityActions = memo(
  (props: { entityMeta: ClassMeta; columnUuid?: string }) => {
    const { entityMeta, columnUuid } = props;
    const classes = useStyles();
    const selectedServiceId = useSelectedServiceId();
    const selectedRole = useSelectedRole();
    const setChanged = useSetRecoilState(authChangedState(selectedServiceId));

    const findAbilityByType = (type: AbilityType): Ability => {
      return (
        selectedRole?.abilities?.find(
          (ability) =>
            ability.entityUuid === entityMeta.uuid &&
            (ability.columnUuid || undefined) === columnUuid &&
            ability.abilityType === type
        ) || {
          can: false,
          expression: "",
          entityUuid: entityMeta.uuid,
          columnUuid: columnUuid,
          abilityType: type,
        }
      );
    };

    const createAbility = findAbilityByType(AbilityType.CREATE);
    const deleteAbility = findAbilityByType(AbilityType.DELETE);
    const readAbility = findAbilityByType(AbilityType.READ);
    const updateAbility = findAbilityByType(AbilityType.UPDATE);

    const handleAbilityChange = (ability: Ability) => {
      if (ability.can) {
        //selectedRole?.upateAbility(ability);
      } else {
        //selectedRole?.removeAbiltiy(ability);
      }

      setChanged(true);
    };

    const isEntity = !columnUuid;

    return (
      <div className={classes.root}>
        <Grid container alignItems="center">
          {selectedRole && (
            <>
              <Grid
                item
                className={classNames(classes.actionGrid, classes.createGrid)}
              >
                {isEntity && (
                  <ActionWithExpression
                    ability={createAbility}
                    label={intl.get("create")}
                    onAbilityChange={handleAbilityChange}
                    noExpression
                    entityMeta={entityMeta}
                  />
                )}
              </Grid>
              <Grid item className={classes.actionGrid}>
                {isEntity && (
                  <ActionWithExpression
                    ability={deleteAbility}
                    label={intl.get("delete")}
                    onAbilityChange={handleAbilityChange}
                    entityMeta={entityMeta}
                  />
                )}
              </Grid>
              <Grid item className={classes.actionGrid}>
                <ActionWithExpression
                  ability={readAbility}
                  label={intl.get("read")}
                  onAbilityChange={handleAbilityChange}
                  entityMeta={entityMeta}
                />
              </Grid>
              <Grid item className={classes.actionGrid}>
                <ActionWithExpression
                  ability={updateAbility}
                  label={intl.get("update")}
                  onAbilityChange={handleAbilityChange}
                  entityMeta={entityMeta}
                />
              </Grid>
            </>
          )}
        </Grid>
      </div>
    );
  }
);
