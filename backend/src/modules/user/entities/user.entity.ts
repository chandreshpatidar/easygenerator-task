import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { UserRole, UserStatus } from '../user.interface';

export class tokenEntity {
  @ApiProperty({
    example: '$2b$10$Vqlge2hipGmX8009NTAhleoZi7k7z1qsvTqSkoqunPbfy651SG/YC',
  })
  accessToken: string;
}

export class UserResponse {
  @ApiProperty({ example: '5f4a3f9f9c9d6b1b2c9d6b1b' })
  _id: mongoose.Schema.Types.ObjectId | string;

  @ApiProperty({ example: 'John' })
  name?: string;

  @ApiProperty({ example: 'example@gmail.com' })
  email?: string;

  @ApiProperty({ example: 'ACTIVE' })
  status?: UserStatus;

  @ApiProperty({ example: '5f4a3f9f9c9d6b1b2c9d6b1b' })
  role?: UserRole;
}

export class GetUserParams {
  @ApiProperty({ example: '5f4a3f9f9c9d6b1b2c9d6b1b' })
  id: string;
}
