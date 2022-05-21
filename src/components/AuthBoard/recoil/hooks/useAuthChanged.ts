import { useSelectedServiceId } from "components/ModelBoard/hooks/useSelectedServiceId";
import { useRecoilValue } from "recoil";
import { authChangedState } from "../atoms";
import { useSelectedRole } from "./useSelectedRole";

export function useChangedKey() {
  const selectedServiceId = useSelectedServiceId();
  const selectedRole = useSelectedRole();

  return `${selectedServiceId}-${selectedRole?.id}`;
}

export function useAuthChanged() {
  const key = useChangedKey();
  const changed = useRecoilValue(authChangedState(key));

  return changed;
}
