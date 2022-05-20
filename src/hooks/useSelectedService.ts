import { useRecoilValue } from "recoil";
import { selectedServiceIdState, servicesState } from "recoil/atoms";

export function useSelectedService(){
  const services = useRecoilValue(servicesState)
  const selectedId = useRecoilValue(selectedServiceIdState)

  return services?.find(service=>service.id === selectedId && !!selectedId)
}