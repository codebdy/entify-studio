import { ID } from './id';
import { User } from './User';

export interface Role {
  id: ID;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  users?: User[];
}
