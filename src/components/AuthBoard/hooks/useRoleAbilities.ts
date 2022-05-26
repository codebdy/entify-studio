import { useSelectedServiceId } from "components/ModelBoard/hooks/useSelectedServiceId";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { ID } from "../meta/id";
import { abilitiesState } from "../recoil/atoms";

export function useRoleAbilities(roleId?: ID) {
  const selectedServiceId = useSelectedServiceId();
  const abilities = useRecoilValue(abilitiesState(selectedServiceId));

  const roleAbilities = useMemo(()=>{
    return abilities.filter((ability) => ability.roleId === roleId);
  }, [abilities, roleId]) 

  return roleAbilities
}
