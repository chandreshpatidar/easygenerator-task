import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { v4 } from 'uuid';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@app/jwt'; // Assuming this is your custom JWT service
import { JWTPayload } from '../modules/auth/auth.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService<JWTPayload>, // Inject the JwtService here
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const isPublic = this.reflector.get<boolean>(
        'isPublic',
        context.getHandler(),
      );

      if (isPublic) {
        return true;
      }

      const request = context.switchToHttp().getRequest();
      const { requestId, authorization } = request.headers;

      // Generate or assign a unique request ID
      const _requestId = requestId || v4();
      request.requestId = _requestId; // Add requestId to the request object

      this.logger.debug(`requestId=${_requestId}`);
      console.log('token', authorization, request.headers);

      if (!authorization) {
        throw new UnauthorizedException('Authorization token not found');
      }

      // Extract the token from the 'Bearer <token>' format
      const token = authorization.replace('Bearer ', '');

      // Verify or decode the token
      const decodedToken = this.jwtService.verify(token); // Use verify() to decode the JWT

      if (decodedToken && decodedToken._id) {
        // Add user information to the request object
        request.user = decodedToken;
        request.userId = decodedToken._id;
        return true;
      }

      throw new UnauthorizedException('Invalid token');
    } catch (error) {
      this.logger.error('Authorization error', error);
      throw new UnauthorizedException('Authorization failed');
    }
  }
}
