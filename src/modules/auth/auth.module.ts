import { UserModule } from './../user/user.module';
import { JwtModuleRegistered } from '../../helpers/jwt.helper';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [JwtModuleRegistered, UserModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
