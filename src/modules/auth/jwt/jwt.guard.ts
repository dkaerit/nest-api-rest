import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * # Clase que puede ser inyectada como dependencia
 * # Se utiliza para proteger las rutas de una aplicación de NestJS usando un token JWT.
 */

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {}