import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getResponse<Request>();
    const status = exception.getStatus();
    const msg = exception.message;

    const body = {
      statusCode: status,
      timeStamp: new Date().toDateString(),
      message: msg,
      path: request.url,
    };

    response.status(status).json(body);
  }
}
