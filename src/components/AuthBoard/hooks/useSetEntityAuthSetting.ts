import { ServerError } from "do-ents/ServerError";
import { useSelectedService } from "hooks/useSelectedService";
import { useCallback } from "react";
import { EntityAuthSettingsInput } from "../meta/EntityAuthSettingsInput";
import { usePostOne } from "do-ents/usePostOne";

type SettingsInputWithType = EntityAuthSettingsInput & { __type: string };

export function useSetEntityAuthSetting(): [
  (set: EntityAuthSettingsInput) => void,
  { loading?: boolean; error?: ServerError }
] {
  const selectedServie = useSelectedService();

  const [post, { loading, error }] = usePostOne<SettingsInputWithType>({
    onCompleted(data: SettingsInputWithType) {},
  });

  const set = useCallback(
    (setting: EntityAuthSettingsInput) => {
      post({ ...setting, __type: "EntityAuthSettings" }, selectedServie?.url);
    },
    [post, selectedServie?.url]
  );

  return [set, { loading, error }];
}
