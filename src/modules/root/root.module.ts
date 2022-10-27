// common
import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv'; dotenv.config();

// module dependencies
import { RootController } from './root.controller';
import { RootService } from './root.service';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';

// mongoose
import { MongoModule } from '../../database/mongo/mongo.module';

@Module({
  imports: [ 
    MongoModule, 
    UserModule, 
    AuthModule 
  ],
  controllers: [RootController],
  providers: [RootService],
})
export class RootModule {}
