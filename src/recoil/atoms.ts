import { Service } from "components/ModelBoard/meta/Service";
import { atom } from "recoil";
import { AppError } from "./AppError";
import { Confirm } from "./confirm";

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

export const appErrorState = atom<AppError | undefined>({
  key: "appError",
  default: undefined,
});

export const loggedUserState = atom<User | undefined>({
  key: "loggedUserState",
  default: undefined,
});

export const confirmState = atom<Confirm | undefined>({
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

export const servicesState = atom<Service[]>({
  key: "services",
  default: [],
});
// export const tokenState = atom<string|undefined>({
//   key: "token",
//   default: undefined,
// })
