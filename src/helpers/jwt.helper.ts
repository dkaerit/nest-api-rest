import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv'; dotenv.config();

export const JwtRegistered = JwtModule.register({
    secret: process.env.TOKEN_SECRET,
    signOptions: { expiresIn: '24h' }
});
