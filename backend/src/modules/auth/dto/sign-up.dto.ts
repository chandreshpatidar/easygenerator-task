import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { z } from 'nestjs-zod/z';

export const SignUpSchema = z.object({
  name: z.string(),
  email: z.string().email({ message: 'Email must be a valid email' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/, {
      message:
        'Password must contain at least one letter, one number, and one special character',
    }),
});

export class SignUpDto {
  @IsString({ message: 'First name must be a string' })
  @ApiProperty({ example: 'John' })
  name: string;

  @IsEmail(
    { allow_display_name: true },
    { message: 'Email must be a valid email' },
  )
  @ApiProperty({ example: 'example@test.com' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString({
    message: 'Password must be a string',
  })
  @MinLength(8, {
    message: 'Password must be at least 8 characters long',
  })
  @Matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/, {
    message:
      'Password must contain at least one letter, one number, and one special character',
  })
  @ApiProperty({ example: '12345678' })
  password: string;
}
