import { useRecoilValue } from "recoil";
import { selectedServiceIdState } from "recoil/atoms";

export function useServiceId(){
  const serviceId = useRecoilValue(selectedServiceIdState);
  return serviceId
}