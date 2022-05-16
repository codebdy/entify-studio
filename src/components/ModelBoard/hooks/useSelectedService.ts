import { useRecoilValue } from "recoil";
import { servicesState } from "recoil/atoms";
import { useSelectedServiceId } from "./useSelectedServiceId";

export function useSelectedService() {
  const serviceId = useSelectedServiceId();
  const services = useRecoilValue(servicesState);

  return services.find((svc) => svc.id === serviceId);
}
