import { AbilityType } from './AbilityType';
import { ID } from './id';

export interface Ability {
  id?: ID;
  entityUuid: string;
  columnUuid?: string;
  can: boolean;
  expression?: string;
  abilityType: AbilityType;
  roleId: ID;
}
