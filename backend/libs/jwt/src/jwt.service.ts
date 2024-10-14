import { Injectable } from '@nestjs/common';
import * as JWT from 'jsonwebtoken';

const jwtSecret = 'JWT_SECRET'; // Replace with your own secret
const jwtExpiresIn = '24h'; // Replace with your own

interface JwtPayload extends JWT.JwtPayload {
  // role: string;
  // email: string;
  // name: string;
  // status: UserStatus;
  // _id: string;
}

@Injectable()
export class JwtService<T> {
  sign(payload: JwtPayload & T, options?: JWT.SignOptions): string {
    return JWT.sign(payload, jwtSecret, {
      expiresIn: jwtExpiresIn,
      ...options,
    });
  }

  verify(token: string, options?: JWT.VerifyOptions): JwtPayload & T {
    return JWT.verify(token, jwtSecret, options) as JwtPayload & T;
  }

  decode(token: string): JwtPayload & T {
    return JWT.decode(token) as JwtPayload & T;
  }
}
