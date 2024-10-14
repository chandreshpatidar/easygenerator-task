import {
  Controller,
  Post,
  Body,
  UseFilters,
  UsePipes,
  UseGuards,
  InternalServerErrorException,
  Get,
  UseInterceptors,
  Inject,
  LoggerService,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ZodValidationPipe } from 'nestjs-zod';

import { AuthService } from './auth.service';
import { SignUpDto, SignUpSchema } from './dto/sign-up.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../../exceptions/http.exception.filter';
import { UserResponse } from '../user/entities/user.entity';
import { SignLoginUpResponse } from './entities/signUp-response';
import { LoginDto, LoginSchema } from './dto/login.dto';
import { AuthGuard } from '../../guards/auth.guard';
import { Public } from '../../decorators/public.decorator';
import { CurrentUser } from '../../decorators/user.decorator';
import { TransformInterceptor } from '../../interceptors/transform.interceptor';
import { LoggingInterceptor } from '../../interceptors/logging.interceptor';
import { JWTPayload } from './auth.interface';

@Controller('auth')
@UseFilters(HttpExceptionFilter)
@UseGuards(AuthGuard)
@UseInterceptors(LoggingInterceptor)
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  @Public()
  @Post('signup')
  @ApiOkResponse({ type: [SignLoginUpResponse] })
  @UsePipes(new ZodValidationPipe(SignUpSchema))
  @UseInterceptors(TransformInterceptor)
  async signup(@Body() signUpInput: SignUpDto) {
    try {
      this.logger.log('Signup with input', signUpInput);
      return await this.authService.singUp(signUpInput);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Public()
  @ApiOkResponse({ type: [UserResponse] })
  @UsePipes(new ZodValidationPipe(LoginSchema))
  @UseInterceptors(TransformInterceptor)
  @Post('login')
  async login(@Body() loginInput: LoginDto) {
    try {
      this.logger.log('login attempt with input', loginInput);
      return await this.authService.login(loginInput);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: [UserResponse] })
  @Get('me')
  async me(@CurrentUser() user: JWTPayload) {
    try {
      return await this.authService.me(user);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
