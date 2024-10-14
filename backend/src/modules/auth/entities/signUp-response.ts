import {
  tokenEntity,
  UserResponse,
} from 'src/modules/user/entities/user.entity';

export class SignLoginUpResponse {
  user: UserResponse;
  accessToken: tokenEntity;
}
