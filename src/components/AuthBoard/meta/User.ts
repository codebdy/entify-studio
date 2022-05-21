import { Role } from './Role';

export interface User {
  id?: number;
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
