import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv'; dotenv.config();

export default JwtModule.register({
    secret: process.env.TOKEN_SECRET,
    signOptions: { expiresIn: '24h' }
});
