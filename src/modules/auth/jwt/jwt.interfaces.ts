/**
 * #title, JwtPayload
 * #brief Interfaz que define la estructura del payload del token JWT.
 */

export interface JwtPayload {
    id: string;
    user: string;
}