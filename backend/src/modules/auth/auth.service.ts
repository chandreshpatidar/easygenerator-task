import { Model } from 'mongoose';
import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@app/jwt';
import { BcryptService } from '@app/bcrypt';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { User } from '../db-models/user.schema';
import { UserRole, UserStatus } from '../user/user.interface';
import { LoginDto } from './dto/login.dto';
import { JWTPayload } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService<JWTPayload>,
    private readonly bcryptService: BcryptService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}
  async singUp(signUpInput: SignUpDto) {
    const existingUserWithSameEmail = await this.userModel.findOne({
      email: signUpInput.email,
    });

    if (existingUserWithSameEmail) {
      this.logger.error(
        'User with this email already exists',
        signUpInput.email,
      );
      throw new Error('User with this email already exists');
    }

    const hashedPassword = await this.bcryptService.hashPassword(
      signUpInput.password,
    );

    const user = await this.userModel.create({
      name: signUpInput.name,
      email: signUpInput.email,
      password: hashedPassword,
      role: UserRole.CUSTOMER,
      status: UserStatus.ACTIVE,
    });

    let accessToken: string;
    if (user) {
      delete user.password;
      accessToken = await this.jwtService.sign({
        email: user.email,
        name: user.name,
        status: user.status as UserStatus,
        role: user.role,
        _id: user._id.toString(),
      });
    }

    return {
      user,
      accessToken,
    };
  }

  async login(loginInput: LoginDto) {
    const user = await this.userModel.findOne({
      email: loginInput.email,
    });

    if (!user) {
      this.logger.error('User not found', loginInput.email);
      throw new Error('User not found');
    }

    if (user.status !== UserStatus.ACTIVE) {
      this.logger.error('User is not active', loginInput.email);
      throw new Error('User is not active');
    }

    const isPasswordValid = await this.bcryptService.comparePassword(
      loginInput.password,
      user.password,
    );

    if (!isPasswordValid) {
      this.logger.error('Invalid password for email', loginInput.email);
      throw new Error('Invalid password');
    }

    let accessToken: string;
    if (user) {
      delete user.password;
      accessToken = await this.jwtService.sign({
        email: user.email,
        name: user.name,
        status: user.status as UserStatus,
        role: user.role,
        _id: user._id.toString(),
      });
    }

    return {
      user,
      accessToken,
    };
  }

  async me(user) {
    const userResponse = await this.userModel.findOne(
      {
        _id: user._id,
      },
      { password: 0 },
    );

    if (!userResponse) {
      this.logger.error('User not found', user._id);
      throw new Error('User not found');
    }

    return userResponse;
  }
}
