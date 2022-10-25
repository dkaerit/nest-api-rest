// common
import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv'; dotenv.config();

// module dependencies
import { RootController } from './root.controller';
import { RootService } from './root.service';
import { UserModule } from '../user/user.module';

// mongoose
import { MongoFactory } from '../../database/mongo/mongo.factory';

@Module({
  imports: [
    MongoFactory,
    UserModule
  ],
  controllers: [RootController],
  providers: [RootService],
})
export class RootModule {}
