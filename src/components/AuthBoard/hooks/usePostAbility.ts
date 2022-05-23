import { ServerError } from "do-ents/ServerError";
import { useSelectedService } from "hooks/useSelectedService";
import { useCallback } from "react";
import { usePostOne } from "do-ents/usePostOne";
import { useSetRecoilState } from "recoil";
import { abilitiesState } from "../recoil/atoms";
import { Ability } from "../meta/Ability";

export function usePostAbility(): [
  (post: Ability) => void,
  { loading?: boolean; error?: ServerError }
] {
  const selectedServie = useSelectedService();
  const setAbilities = useSetRecoilState(
    abilitiesState(selectedServie?.id || 0)
  );

  const [post, { loading, error }] = usePostOne<Ability>("Ability", {
    onCompleted(ability: Ability) {
      setAbilities((abilities) => {
        if (ability.columnUuid) {
          //字段级别
          return [
            ...abilities.filter(
              (abi) =>
                !abi.columnUuid ||
                (abi.columnUuid &&
                  (abi.entityUuid !== ability.entityUuid ||
                    abi.roleId !== ability.roleId ||
                    abi.abilityType !== ability.abilityType ||
                    abi.columnUuid !== ability.columnUuid))
            ),
            ability,
          ];
        } else {
          return [
            ...abilities.filter(
              (abi) =>
                abi.columnUuid ||
                (!abi.columnUuid &&
                  (abi.entityUuid !== ability.entityUuid ||
                    abi.roleId !== ability.roleId ||
                    abi.columnUuid !== ability.columnUuid ||
                    abi.abilityType !== ability.abilityType))
            ),
            ability,
          ];
        }
      });
    },
  });

  const save = useCallback(
    (ability: Ability) => {
      post(ability, selectedServie?.url);
    },
    [post, selectedServie?.url]
  );

  return [save, { loading, error }];
}
