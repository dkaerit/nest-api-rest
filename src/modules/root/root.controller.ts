import { Controller, Get } from '@nestjs/common';
import { VersionService } from './root.service';

@Controller()
export class VersionController {
  constructor(private readonly versionService: VersionService) {}

  @Get() getHello(): string { return this.versionService.getHello(); }
}
