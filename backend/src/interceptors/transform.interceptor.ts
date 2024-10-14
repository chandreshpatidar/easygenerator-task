import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Response as ExpressResponse } from 'express';

const cookieAge = 1000 * 60 * 60 * 24 * 30;
const domain = '';
const productionDomain = 'example.com';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<Response<T>>> {
    return next.handle().pipe(
      tap((data) => {
        if (data?.accessToken) {
          const http = context.switchToHttp();
          const response: ExpressResponse = http.getResponse();

          const isProduction = process.env.APP_ENV !== 'development';

          response.cookie('token', data.accessToken, {
            domain: isProduction ? productionDomain : domain, // Ensure the domain is set to handle subdomains
            maxAge: cookieAge,
            path: '/', // Cookie is available site-wide
            httpOnly: true, // Helps prevent JavaScript access to cookies
            secure: isProduction, // Use HTTPS
            sameSite: isProduction ? 'none' : 'lax',
          });
        }
      }),
    );
  }
}
