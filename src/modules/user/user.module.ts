import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService,  } from './user.service';
import { UserFeatured } from './user.schema';


@Module({
  imports: [UserFeatured],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
