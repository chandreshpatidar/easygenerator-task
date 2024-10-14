import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { z } from 'nestjs-zod/z';

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Email must be a valid email' }),
  password: z.string(),
});

export class LoginDto {
  @IsNotEmpty()
  @IsEmail(
    { allow_display_name: true },
    { message: 'Email must be a valid email' },
  )
  @ApiProperty({ example: 'example@test.com' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @ApiProperty({ example: '12345678' })
  password: string;
}
