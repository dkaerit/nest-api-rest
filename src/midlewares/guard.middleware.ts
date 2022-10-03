import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class GuardMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    next();
  }
}
