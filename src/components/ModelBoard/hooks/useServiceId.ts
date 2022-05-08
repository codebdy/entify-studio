import { useRecoilValue } from "recoil";
import { serviceIdState } from "../recoil/atoms";

export function useServiceId(){
  const serviceId = useRecoilValue(serviceIdState);
  return serviceId
}