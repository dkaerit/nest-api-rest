import { UserService } from '../user/user.service';
import { UserDto } from '../user/user.dto';
import { UserDocument } from '../user/user.schema';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from '../../streategies/jwt/jwt.strategy';
import { omit } from 'lodash';
import { RegisterAuthDto, LoginEmailAuthDto, LoginUsernameAuthDto, LoginTlfnAuthDto, UserTokenized } from './auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly jwtStrategy: JwtStrategy
    ) { }

    /**
     * #brief, Función para añadir usuario, la cual hace uso del controlador ya existente del modulo user
     * #param RegisterAuthDto, información del usuario a registrar
     * #return Promise<UserDocument>, retorna información del usuario registrado
     */

    async register(userObject: RegisterAuthDto): Promise<UserDocument> {
        return await this.userService.createUser(userObject);
    }

    /**
     * Realiza la autenticación utilizando las credenciales proporcionadas.
     * #param identifier - Identificador del usuario (email, username, tlfn).
     * #param found - Objeto UserDto que representa al usuario encontrado.
     * #param passwd - Contraseña proporcionada por el usuario.
     * #returns Una promesa que resuelve en un objeto UserTokenized que contiene el token de sesión.
     * #throws HttpException si el usuario no se encuentra o la contraseña es inválida.
     */

    private async loginWithCredentials(identifier: string, found: UserDto, passwd: string): Promise<UserTokenized> {
        if (!found)
            throw new HttpException(`User with identifier ${identifier} not found`, HttpStatus.NOT_FOUND);

        // Crea un payload (información del usuario), un argumento necesario para obtener posteriormente el token con JWT.
        const payload = await this.jwtStrategy.payload(found["_id"], found["user"]);
        const token = this.jwtService.sign(payload);

        // Compara la contraseña proporcionada con la contraseña almacenada en la base de datos.
        // La función "compare" verifica que las contraseñas coincidan sin exponer la contraseña real en el proceso.
        if (!(await compare(passwd, found.passwd)))
            throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);

        // Elimina ciertas claves sensibles del objeto de usuario antes de devolverlo.
        // Esto se hace para proteger la privacidad del usuario y evitar la exposición de datos confidenciales.
        const keysToDelete = ["passwd", "email", "_vk", "user"];
        return { ...(omit(found["_doc"], keysToDelete)), token };
    }

    /**
     * Función para recibir el token de sesión utilizando el email
     * #param LoginEmailAuthDto - objeto que contiene la información recibida desde el formulario de login
     * #return Promise<UserTokenized> - promesa con el token de sesión
     */

    async loginWithEmail(userObjectLogin: LoginEmailAuthDto): Promise<UserTokenized> {
        const { email, passwd } = userObjectLogin;
        const user = await this.userService.readUserByEmail(email); // Busca al usuario por su dirección de correo electrónico.
        return this.loginWithCredentials(email, user, passwd); // Llama a la función para autenticar al usuario con las credenciales proporcionadas.
    }

    /**
     * Función para recibir el token de sesión utilizando el username
     * #param LoginUsernameAuthDto - obj. que contiene la información recibida desde el formul. de login
     * #return Promise<UserTokenized> - promesa con el token de sesión
     */

    async loginWithUsername(userObjectLogin: LoginUsernameAuthDto): Promise<UserTokenized> {
        const { username, passwd } = userObjectLogin;
        const user = await this.userService.readUserByUsername(username); // Busca al usuario por su nombre de usuario.
        return this.loginWithCredentials(username, user, passwd); // Llama a la función para autenticar al usuario con las credenciales proporcionadas.
    }

    /**
     * Función para recibir el token de sesión utilizando el teléfono
     * #param LoginTlfnAuthDto - objeto que contiene la información recibida desde el formulario de login
     * #return Promise<UserTokenized> - promesa con el token de sesión
     */

    async loginWithTlfn(userObjectLogin: LoginTlfnAuthDto): Promise<UserTokenized> {
        const { tlfn, passwd } = userObjectLogin;
        const user = await this.userService.readUserByTlfn(tlfn); // Busca al usuario por su número de teléfono.
        return this.loginWithCredentials(tlfn, user, passwd); // Llama a la función para autenticar al usuario con las credenciales proporcionadas.
    }

    /**
     * #brief, función para lrecibir el token de sesión
     * #param LoginAuthDto, objeto que contiene la información recibida desde el formulario de login
     * #return Promise<UserTokenized>, promesa con el token de sesión
     */
    async loginWithGoogle(): Promise<UserTokenized> {
        return { "token": "" }
    }

    /**
     * #brief, Verifica la expiración de un token JWT.
     * #param token - El token JWT que se va a verificar.
     * #return Una promesa que resuelve en un objeto { expired: boolean } indicando si el token ha expirado.
     * #throws HttpException si el token es inválido o ha expirado.
     */

    async checkTokenExpiration(token: string): Promise<{ expired: boolean }> {
        try {
            const decodedToken = this.jwtService.verify(token);
            const expirationTime = decodedToken.exp;
            const isExpired = expirationTime < Date.now() / 1000;
            return { expired: isExpired };

        } catch (error) {
            throw new HttpException('Invalid token or token expired', HttpStatus.UNAUTHORIZED);
        }
    }

    async getUserInfoByToken(token: string): Promise<UserDocument> {
        try {
            const decodedToken = this.jwtService.verify(token);
            const userId = decodedToken.id;
            // Obtén la información del usuario basándote en userId
            const user = await this.userService.readUserById(userId);
            // Elimina campos sensibles antes de devolver la información del usuario
            const userInfo = omit(user, ['passwd', 'email']);
            return userInfo;
        } catch (error) {
            throw new HttpException('Invalid token or token expired', HttpStatus.UNAUTHORIZED);
        }
    }
}
