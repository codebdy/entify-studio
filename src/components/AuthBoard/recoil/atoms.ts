import { atomFamily } from "recoil";
import { Role } from "../meta/Role";

export const selectedRoleState = atomFamily<Role|undefined, number>({
  key: "selectedRole",
  default: undefined,
});

export const authChangedState =  atomFamily<boolean, number>({
  key: "authChanged",
  default: false,
});

