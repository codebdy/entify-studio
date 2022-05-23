import { ServerError } from "do-ents/ServerError";
import { useSelectedService } from "hooks/useSelectedService";
import { useCallback } from "react";
import { EntityAuthSettingsInput } from "../meta/EntityAuthSettingsInput";
import { usePostOne } from "do-ents/usePostOne";
import { useSetRecoilState } from "recoil";
import { entityAuthSettingsState } from "../recoil/atoms";
import { EntityAuthSettings } from "../meta/EntityAuthSettings";

export function useSetEntityAuthSetting(): [
  (set: EntityAuthSettingsInput) => void,
  { loading?: boolean; error?: ServerError }
] {
  const selectedServie = useSelectedService();
  const setEntitiyAuthSettings = useSetRecoilState(
    entityAuthSettingsState(selectedServie?.id || 0)
  );
  const [post, { loading, error }] = usePostOne<EntityAuthSettingsInput>(
    "EntityAuthSettings",
    {
      onCompleted(data: any) {
        const obj: EntityAuthSettings = data;
        setEntitiyAuthSettings((settings) => [
          ...settings.filter(
            (setting) => setting.entityUuid !== data.entityUuid
          ),
          obj,
        ]);
      },
    }
  );

  const set = useCallback(
    (setting: EntityAuthSettingsInput) => {
      post({ ...setting }, selectedServie?.url);
    },
    [post, selectedServie?.url]
  );

  return [set, { loading, error }];
}
