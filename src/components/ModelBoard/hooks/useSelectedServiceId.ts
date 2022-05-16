import { useRecoilValue } from "recoil";
import { selectedServiceIdState } from "recoil/atoms";

export function useSelectedServiceId(){
  const serviceId = useRecoilValue(selectedServiceIdState);
  return serviceId
}