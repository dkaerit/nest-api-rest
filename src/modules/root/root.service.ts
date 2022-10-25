import { Injectable } from '@nestjs/common';

// service
@Injectable()
export class RootService {
  public async appInfo() {
    return {
      "name": "API Rest Full", 
      "framework": "Nestjs",
      "version": "8.0.0"
    };
  }
}
