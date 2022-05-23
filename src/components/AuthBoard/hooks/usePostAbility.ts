import { ServerError } from "do-ents/ServerError";
import { useSelectedService } from "hooks/useSelectedService";
import { useCallback } from "react";
import { usePostOne } from "do-ents/usePostOne";
import { useSetRecoilState } from "recoil";
import { entityAuthSettingsState } from "../recoil/atoms";
import { Ability } from "../meta/Ability";

export function usePostAbility(): [
  (post: Ability) => void,
  { loading?: boolean; error?: ServerError }
] {
  const selectedServie = useSelectedService();
  const setEntitiyAuthSettings = useSetRecoilState(
    entityAuthSettingsState(selectedServie?.id || 0)
  );
  const [post, { loading, error }] = usePostOne<Ability>(
    "Ability",
    {
      onCompleted(data: any) {
        setEntitiyAuthSettings((abilities) => [
          ...abilities.filter(
            (ability) => ability.entityUuid !== data.entityUuid
          ),
          data,
        ]);
      },
    }
  );

  const save = useCallback(
    (ability: Ability) => {
      post(ability, selectedServie?.url);
    },
    [post, selectedServie?.url]
  );

  return [save, { loading, error }];
}
