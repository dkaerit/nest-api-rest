import { UserModule } from './../user/user.module';
import { JwtRegistered } from '../../helpers/jwt.helper';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [JwtRegistered, UserModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
