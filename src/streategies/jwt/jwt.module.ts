import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv'; dotenv.config();

/**
 * #title, Jwt Module
 * #brief Un módulo para el manejo de la autenticación JWT.
 */

export default JwtModule.register({
    secret: process.env.TOKEN_SECRET, // secreto
    signOptions: { expiresIn: '24h' } // tiempo de expiración
});
