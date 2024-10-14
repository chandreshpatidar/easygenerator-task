import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class BcryptService {
  generateSalt(rounds: number): Promise<string> {
    return bcrypt.genSalt(rounds);
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await this.generateSalt(10);
    return bcrypt.hash(password, salt);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
