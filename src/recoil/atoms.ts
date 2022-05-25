import { Role } from "components/AuthBoard/meta/Role";
import { Service } from "components/ModelBoard/meta/Service";
import { ServerError } from "do-ents/ServerError";
import { atom } from "recoil";
import { IConfirm } from "./confirm";

export interface User {
  id: number;
  loginName: string;
  isSupper?: boolean;
  isDemo?: boolean;
}

export const themeModeState = atom<"light" | "dark">({
  key: "themeMode",
  default: "dark",
});

export const successAlertState = atom<boolean | string>({
  key: "successAlert",
  default: false,
});

export const serverErrorState = atom<ServerError | undefined>({
  key: "serverError",
  default: undefined,
});

export const appErrorState = atom<string | undefined>({
  key: "appError",
  default: undefined,
});


export const loggedUserState = atom<User | undefined>({
  key: "loggedUserState",
  default: undefined,
});

export const confirmState = atom<IConfirm | undefined>({
  key: "confirm",
  default: undefined,
});

export const authUrlState = atom<string|undefined>({
  key: "authUrlStatus",
  default:undefined,
});


export const selectedServiceIdState = atom<number>({
  key: "selectedServiceId",
  default: 0,
});

export const refreshServicesState = atom<number>({
  key: "refreshServices",
  default: 0,
});

export const servicesState = atom<Service[]>({
  key: "services",
  default: [],
});

export const rolesState = atom<Role[]>({
  key: "roles",
  default: [],
});

export const tokenState = atom<string|undefined>({
  key: "token",
  default: undefined,
})
