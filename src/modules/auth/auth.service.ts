import { UserService } from '../user/user.service';
import { UserDocument } from '../user/user.schema';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { RegisterAuthDto, LoginAuthDto, UserTokenized } from './auth.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly jwtStrategy: JwtStrategy
    ) {}

    /**
     * #brief,
     * #param
     * #return
     */
    async register(userObject:RegisterAuthDto): Promise<UserDocument> {
        return await this.userService.createUser(userObject);
    }

    /**
     * #brief,
     * #param
     * #return
     */
    async login(userObjectLogin:LoginAuthDto): Promise<UserTokenized> {
        const { email, passwd } = userObjectLogin;
        const finded = await this.userService.readUserByEmail(email); 
        const payload = await this.jwtStrategy.payload(finded["_id"], finded["user"]);
        const token = this.jwtService.sign(payload);
        
        if(!finded) 
        throw new HttpException(`User con email ${email} not found`, HttpStatus.NOT_FOUND);

        if(!await compare(passwd, finded.passwd)) 
        throw new HttpException(`Password ${passwd} incorrect`, HttpStatus.FORBIDDEN);

        return { ...finded["_doc"], token };
    }
}
