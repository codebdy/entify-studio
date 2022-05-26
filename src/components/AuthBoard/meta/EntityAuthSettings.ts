import { ID } from "./id";

export interface EntityAuthSettings {
  id?: ID;
  entityUuid: string;
  expand?: boolean;
}
