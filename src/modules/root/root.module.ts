import { MongoFactory } from '../../../database/mongodb/mongo.factory';
import { Module } from '@nestjs/common';
import { VersionController } from './root.controller';
import { VersionService } from './root.service';


@Module({
  imports: [MongoFactory],
  controllers: [VersionController],
  providers: [VersionService],
})
export class VersionModule {}
