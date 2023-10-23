import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt.interfaces';



/**
 * #title, JwtStrategy
 * #brief, Clase que representa la estrategia utilizada para la autenticación con tokens JWT. 
 */

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        // Extrae el token JWT del encabezado de autorización de la solicitud.
        // en falso, se comprobará la caducidad del token.
        // La clave secreta utilizada para firmar el token JWT.
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
            ignoreExpiration: false, 
            secretOrKey: process.env.TOKEN_SECRET, // ...
        });
    }
      
    /**
     * #title validate
     * #brief Método utilizado para validar el payload del token JWT.
     * #param payload:JwtPayload, objeto que contiene el payload del token.
     * #returns objeto que representa al usuario autenticado.
     */

    async validate(payload: JwtPayload) {
        return { id: payload.id, user: payload.user }; 
    }

    /**
     * #title payload
     * #brief Son los datos que se envían en un mensaje o paquete, transportando información útil.
     * #param id:string, identificador del usuario.
     * #param user:string, nombre del usuario.
     * #returns objeto que representa al payload del token JWT.
     */

    async payload(id:string, user:string) {
        return { id, user }; // ...
    }
}
