import { Grid, Box } from "@mui/material";
import { ActionWithExpression } from "./ActionWithExpression";
import intl from "react-intl-universal";
import { ClassMeta } from "components/ModelBoard/meta/ClassMeta";
import { Ability } from "components/AuthBoard/meta/Ability";
import { memo, useCallback, useMemo } from "react";
import { AbilityType } from "./meta/AbilityType";
import { useRoleAbilities } from "./hooks/useRoleAbilities";
import { useSelectedRoleId } from "./hooks/useSelectedRoleId";

export const AbilityActions = memo(
  (props: { entityMeta: ClassMeta; columnUuid?: string }) => {
    const { entityMeta, columnUuid } = props;
    const selectedRoleId = useSelectedRoleId();
    const roleAbilities = useRoleAbilities(selectedRoleId);
    const isEntity = !columnUuid;

    const findAbilityByType = useCallback(
      (type: AbilityType): Ability => {
        //实体级别
        let foundAbility = roleAbilities?.find(
          (ability) =>
            !ability.columnUuid &&
            isEntity &&
            ability.entityUuid === entityMeta.uuid &&
            ability.abilityType === type
        );

        //字段级别
        if (!foundAbility) {
          foundAbility = roleAbilities?.find(
            (ability) =>
              !!ability.columnUuid &&
              !isEntity &&
              ability.entityUuid === entityMeta.uuid &&
              ability.columnUuid === columnUuid &&
              ability.abilityType === type
          );
        }

        return (
          foundAbility || {
            can: false,
            expression: "",
            entityUuid: entityMeta.uuid,
            columnUuid: columnUuid,
            abilityType: type,
            roleId: selectedRoleId || "",
          }
        );
      },
      [columnUuid, entityMeta.uuid, isEntity, roleAbilities, selectedRoleId]
    );

    const createAbility = useMemo(
      () => findAbilityByType(AbilityType.CREATE),
      [findAbilityByType]
    );

    const deleteAbility = useMemo(
      () => findAbilityByType(AbilityType.DELETE),
      [findAbilityByType]
    );
    const readAbility = useMemo(
      () => findAbilityByType(AbilityType.READ),
      [findAbilityByType]
    );
    const updateAbility = useMemo(
      () => findAbilityByType(AbilityType.UPDATE),
      [findAbilityByType]
    );

    return (
      <Box
        sx={{
          width: 600,
        }}
      >
        <Grid container alignItems="center">
          {selectedRoleId !== undefined && (
            <>
              <Grid
                item
                sx={{
                  width: "20%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {isEntity && (
                  <ActionWithExpression
                    ability={createAbility}
                    label={intl.get("create")}
                    noExpression
                    entityMeta={entityMeta}
                  />
                )}
              </Grid>
              <Grid
                item
                sx={{
                  width: "25%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {isEntity && (
                  <ActionWithExpression
                    ability={deleteAbility}
                    label={intl.get("delete")}
                    entityMeta={entityMeta}
                  />
                )}
              </Grid>
              <Grid
                item
                sx={{
                  width: "25%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ActionWithExpression
                  ability={readAbility}
                  label={intl.get("read")}
                  entityMeta={entityMeta}
                />
              </Grid>
              <Grid
                item
                sx={{
                  width: "25%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ActionWithExpression
                  ability={updateAbility}
                  label={intl.get("update")}
                  entityMeta={entityMeta}
                />
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    );
  }
);
