import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
  LoggerService,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    @Inject('winston') private readonly logger: LoggerService, // Use the Winston logger here
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    let ipAddress =
      req.headers['x-forwarded-for'] || req.ip || req.connection.remoteAddress;

    // Normalize IP: Convert "::1" (IPv6 loopback) to "127.0.0.1"
    if (ipAddress === '::1') {
      ipAddress = '127.0.0.1';
    }

    const method = req.method;
    const url = req.originalUrl;

    const startTime = Date.now();

    return next.handle().pipe(
      tap(() => {
        const responseTime = Date.now() - startTime;
        this.logger.log(
          `Request to ${method} ${url} from IP: ${ipAddress} took ${responseTime}ms`,
          'HTTP',
        );
      }),
    );
  }
}
