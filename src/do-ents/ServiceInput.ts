
export enum ServiceType{
  auth = "auth",
  normal = "normal"
}


export interface ServiceInput {
  id: number;
  url: string;
  name: string;
  serviceType: ServiceType;
}
