import { atomFamily } from "recoil";

export const selectedRoleIdState = atomFamily<number|undefined, number>({
  key: "selectedRoleId",
  default: undefined,
});

export const authChangedState =  atomFamily<boolean, string>({
  key: "authChanged",
  default: false,
});

