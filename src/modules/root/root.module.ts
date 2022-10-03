import { Module } from '@nestjs/common';
import { VersionController } from './root.controller';
import { VersionService } from './root.service';

@Module({
  imports: [],
  controllers: [VersionController],
  providers: [VersionService],
})
export class VersionModule {}
