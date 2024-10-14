import { ExecutionContext, Injectable } from '@nestjs/common';
import { ThrottlerGuard as NestJSThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class ThrottlerGuard extends NestJSThrottlerGuard {
  protected async getTracker(req: Record<string, any>): Promise<string> {
    return req.ips.length ? req.ips[0] : req.ip; // avoid fake proxy
  }

  getRequestResponse(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const ctx = request.getContext();
    return { req: ctx.req, res: ctx.res };
  }
}
