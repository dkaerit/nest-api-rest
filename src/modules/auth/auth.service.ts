import { UserService } from '../user/user.service';
import { UserDto } from '../user/user.dto';
import { UserDocument } from '../user/user.schema';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { omit } from 'lodash';
import { RegisterAuthDto, LoginEmailAuthDto, LoginUsernameAuthDto, LoginTlfnAuthDto, UserTokenized } from './auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly jwtStrategy: JwtStrategy
    ) {}

    /**
     * #brief, Función para añadir usuario, la cual hace uso del controlador ya existente del modulo user
     * #param RegisterAuthDto, información del usuario a registrar
     * #return Promise<UserDocument>, retorna información del usuario registrado
     */

    async register(userObject:RegisterAuthDto): Promise<UserDocument> {
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

    private async loginWithCredentials(identifier:string, found: UserDto, passwd: string): Promise<UserTokenized> {
        if (!found) 
        throw new HttpException(`User with identifier ${identifier} not found`, HttpStatus.NOT_FOUND);

        const payload = await this.jwtStrategy.payload(found["_id"], found["user"]);
        const token = this.jwtService.sign(payload);
        
        if (!(await compare(passwd, found.passwd))) 
        throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
        
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
        const user = await this.userService.readUserByEmail(email);
        return this.loginWithCredentials(email, user, passwd);
    }

    /**
     * Función para recibir el token de sesión utilizando el username
     * #param LoginUsernameAuthDto - obj. que contiene la información recibida desde el formul. de login
     * #return Promise<UserTokenized> - promesa con el token de sesión
     */
    
    async loginWithUsername(userObjectLogin: LoginUsernameAuthDto): Promise<UserTokenized> {
        const { username, passwd } = userObjectLogin;
        const user = await this.userService.readUserByUsername(username);
        return this.loginWithCredentials(username, user, passwd);
    }

    /**
     * Función para recibir el token de sesión utilizando el teléfono
     * #param LoginTlfnAuthDto - objeto que contiene la información recibida desde el formulario de login
     * #return Promise<UserTokenized> - promesa con el token de sesión
     */
    
    async loginWithTlfn(userObjectLogin: LoginTlfnAuthDto): Promise<UserTokenized> {
        const { tlfn, passwd } = userObjectLogin;
        const user = await this.userService.readUserByTlfn(tlfn);
        return this.loginWithCredentials(tlfn, user, passwd);
    }

    /**
     * #brief, función para lrecibir el token de sesión
     * #param LoginAuthDto, objeto que contiene la información recibida desde el formulario de login
     * #return Promise<UserTokenized>, promesa con el token de sesión
     */
    async loginWithGoogle(): Promise<UserTokenized> {
        return {"token":""}
    }
}
