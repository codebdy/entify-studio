import { Grid, Box } from "@mui/material";
import { ActionWithExpression } from "./ActionWithExpression";
import intl from "react-intl-universal";
import { ClassMeta } from "components/ModelBoard/meta/ClassMeta";
import { Ability } from "components/AuthBoard/meta/Ability";
import { memo, useCallback, useMemo } from "react";
import { useSetRecoilState } from "recoil";
import { abilitiesState, authChangedState } from "./recoil/atoms";
import { AbilityType } from "./meta/AbilityType";
import { useSelectedRole } from "./hooks/useSelectedRole";
import { useChangedKey } from "./hooks/useAuthChanged";
import { useRoleAbilities } from "./hooks/useRoleAbilities";
import { useSelectedServiceId } from "components/ModelBoard/hooks/useSelectedServiceId";

export const AbilityActions = memo(
  (props: { entityMeta: ClassMeta; columnUuid?: string }) => {
    const { entityMeta, columnUuid } = props;
    const selectedRole = useSelectedRole();
    const selectedServiceId = useSelectedServiceId();
    const changedKey = useChangedKey();
    const roleAbilities = useRoleAbilities(selectedRole?.id);
    const setChanged = useSetRecoilState(authChangedState(changedKey));
    const setAbilities = useSetRecoilState(abilitiesState(selectedServiceId));

    const findAbilityByType = useCallback(
      (type: AbilityType): Ability => {
        return (
          roleAbilities?.find(
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
            roleId: selectedRole?.id || 0,
          }
        );
      },
      [columnUuid, entityMeta.uuid, roleAbilities, selectedRole?.id]
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

    const handleAbilityChange = (ability: Ability) => {
      if (ability.can) {
        setAbilities((abilities) => [
          ...abilities.filter(
            (abi) =>
              abi.entityUuid !== ability.entityUuid ||
              (ability.columnUuid || undefined) !== ability.columnUuid ||
              abi.roleId !== ability.roleId ||
              abi.abilityType !== ability.abilityType
          ),
          ability,
        ]);
      } else {
        setAbilities((abilities) =>
          abilities.filter(
            (abi) =>
              abi.entityUuid !== ability.entityUuid ||
              (ability.columnUuid || undefined) !== ability.columnUuid ||
              abi.roleId !== ability.roleId ||
              abi.abilityType !== ability.abilityType
          )
        );
      }

      setChanged(true);
    };

    const isEntity = !columnUuid;

    return (
      <Box
        sx={{
          width: 600,
        }}
      >
        <Grid container alignItems="center">
          {selectedRole && (
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
                    onAbilityChange={handleAbilityChange}
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
                    onAbilityChange={handleAbilityChange}
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
                  onAbilityChange={handleAbilityChange}
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
                  onAbilityChange={handleAbilityChange}
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
