import { Types } from 'mongoose';

export enum UserRole {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export interface UserEntity {
  _id: string | Types.ObjectId;
  name: string;
  email: string;
  status: UserStatus;
  role: UserRole;
  archived: boolean;
}
