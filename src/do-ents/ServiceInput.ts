import { ServiceType } from "./useAddService";


export interface ServiceInput {
  id: number;
  url: string;
  name: string;
  serviceType: ServiceType;
}
