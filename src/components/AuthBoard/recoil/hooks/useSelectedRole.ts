import { useSelectedServiceId } from "components/ModelBoard/hooks/useSelectedServiceId";
import { useRecoilValue } from "recoil";
import { rolesState } from "recoil/atoms";
import { selectedRoleIdState } from "../atoms";

export function useSelectedRole() {
  const selectedServiceId = useSelectedServiceId();
  const selectedRoleId = useRecoilValue(selectedRoleIdState(selectedServiceId));
  const roles = useRecoilValue(rolesState);

  return roles.find((role) => role.id === selectedRoleId);
}
