import { atom } from "recoil";
import { Role } from "../meta/Role";

export const selectedRoleState = atom<Role|undefined>({
  key: "selectedRole",
  default: undefined,
});

export const authChangedState =  atom<boolean>({
  key: "authChanged",
  default: false,
});

