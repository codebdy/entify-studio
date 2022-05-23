import { User } from './User';

export interface Role {
  id: number;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  users?: User[];
}
