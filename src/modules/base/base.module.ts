// common
import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv'; dotenv.config();

// module dependencies
import { BaseController } from './base.controller';
import { BaseService } from './base.service';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';

// mongoose
import { MongoModule } from '../../database/mongo.module';

@Module({
  imports: [ 
    MongoModule, // Módulo de MongoDB.
    UserModule, // Módulo de usuarios (dependencia).
    AuthModule // Módulo de usuarios (dependencia).
  ],
  controllers: [BaseController],
  providers: [BaseService],
})
export class BaseModule {}
