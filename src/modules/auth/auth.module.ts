import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import JwtModule from './jwt/jwt.module';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports: [
    JwtModule, 
    UserModule 
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
