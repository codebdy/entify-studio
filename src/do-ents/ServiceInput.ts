export enum ServiceType {
  EntifyAuth = "entifyAuth",
  Entify = "entify",
  OtherGQL = "otherGQL",
  OtherAuth = "otherAuth",
}

export interface ServiceInput {
  id: number;
  url: string;
  name: string;
  serviceType: ServiceType;
}
