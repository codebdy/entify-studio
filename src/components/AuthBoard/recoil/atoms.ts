import { atomFamily } from "recoil";

export const selectedRoleIdState = atomFamily<number | undefined, number>({
  key: "selectedRoleId",
  default: undefined,
});

// 索引格式：${serviceId}-${roleId}
export const authChangedState = atomFamily<boolean, string>({
  key: "authChanged",
  default: false,
});

// export const abilitiesState = atomFamily<Ability[], number>({
//   key: "abilities",
//   default: [],
// });

// export const entityAuthSettingsState = atomFamily<EntityAuthSettings[], number>({
//   key: "entityAuthSettings",
//   default: [],
// });
