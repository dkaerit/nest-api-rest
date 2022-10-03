import { Injectable } from '@nestjs/common';

@Injectable()
export class VersionService {
  getHello(): string {
    return `API Rest Full - Running in Nestjs 8.0.0`;
  }
}
