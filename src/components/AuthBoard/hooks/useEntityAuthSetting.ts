import { useSelectedServiceId } from "components/ModelBoard/hooks/useSelectedServiceId";
import { useRecoilValue } from "recoil";
import { entityAuthSettingsState } from "../recoil/atoms";

export function useEntityAuthSetting(uuid: string) {
  const selectedServiceId = useSelectedServiceId();
  const entityAuths = useRecoilValue(
    entityAuthSettingsState(selectedServiceId)
  );

  return entityAuths.find((auth) => auth.entityUuid === uuid);
}
