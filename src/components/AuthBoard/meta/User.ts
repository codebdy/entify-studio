import { ID } from './id';
import { Role } from './Role';

export interface User {
  id: ID;
  name: string;
  loginName: string;
  email?: string;
  password: string;
  isSupper?: boolean;
  isDemo?: boolean;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
  roles?: Role[];
}
