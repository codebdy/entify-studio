import { useSelectedServiceId } from "components/ModelBoard/hooks/useSelectedServiceId";
import { useRecoilValue } from "recoil";
import { selectedRoleIdState } from "../recoil/atoms";

export function useSelectedRoleId() {
  const selectedServiceId = useSelectedServiceId();
  const selectedRoleId = useRecoilValue(selectedRoleIdState(selectedServiceId));
  return selectedRoleId
}
