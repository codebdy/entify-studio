import { ServerError } from "./ServerError";


export interface PostOptions {
  onCompleted?: (status: boolean) => void;
  onError?: (error: ServerError) => void;
  serverUrl?: string;
}
