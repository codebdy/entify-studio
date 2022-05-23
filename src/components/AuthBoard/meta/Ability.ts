import { AbilityType } from './AbilityType';

export interface Ability {
  id?: number;
  entityUuid: string;
  columnUuid?: string;
  can: boolean;
  expression?: string;
  abilityType: AbilityType;
  roleId: number;
}
