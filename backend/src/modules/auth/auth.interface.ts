import { UserStatus } from '../user/user.interface';

export interface JWTPayload {
  role: string;
  email: string;
  name: string;
  status: UserStatus;
  _id: string;
}
