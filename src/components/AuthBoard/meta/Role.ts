import { User } from './User';
import { Ability } from './Ability';

export interface Role {
  id: number;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  users?: User[];
  abilities?: Ability[];
}
