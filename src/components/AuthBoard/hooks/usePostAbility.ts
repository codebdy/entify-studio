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
