import { UserService } from '../user/user.service';
import { UserDocument } from '../user/user.schema';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { RegisterAuthDto, LoginAuthDto, UserTokenized } from './auth.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { omit } from 'lodash';

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
     * #brief, función para lrecibir el token de sesión
     * #param LoginAuthDto, objeto que contiene la información recibida desde el formulario de login
     * #return Promise<UserTokenized>, promesa con el token de sesión
     */
    async loginJWT(userObjectLogin:LoginAuthDto): Promise<UserTokenized> {
        const { email, passwd } = userObjectLogin;
        const finded = await this.userService.readUserByEmail(email); 
        const payload = await this.jwtStrategy.payload(finded["_id"], finded["user"]);
        const token = this.jwtService.sign(payload);
        
        if(!finded) 
        throw new HttpException(`User con email ${email} not found`, HttpStatus.NOT_FOUND);

        if(!await compare(passwd, finded.passwd)) 
        throw new HttpException(`Password ${passwd} incorrect`, HttpStatus.FORBIDDEN);

        const keysToDelete = ["passwd", "email", "_vk", "user"];
        return { ...(omit(finded["_doc"], keysToDelete)), token };
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
