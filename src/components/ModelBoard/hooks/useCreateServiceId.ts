import { useRecoilValue } from "recoil";
import { servicesState } from "recoil/atoms";
import _ from "lodash";

export function useCreateServiceId() {
  const services = useRecoilValue(servicesState);
  const max = _.max(services.map((service) => service.id))
  return (max ? max : 1) + 1;
}
