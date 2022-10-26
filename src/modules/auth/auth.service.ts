import { UserService } from '../user/user.service';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { RegisterAuthDto, LoginAuthDto, UserTokenized } from './auth.dto';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    private static secret = process.env.TOKEN_SECRET as string;
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    /**
     * #brief,
     * #param
     * #return
     */
    async register(userObject:RegisterAuthDto) {
        return await this.userService.createUser(userObject);
    }

    /**
     * #brief,
     * #param
     * #return
     */
    async login(userObjectLogin:LoginAuthDto) {
        const { email, passwd } = userObjectLogin;
        const finded = await this.userService.readUserByEmail(email); 
        const token = this.jwtService.sign({ _id:finded["_id"], user:finded["user"] });

        if(!finded) 
        throw new HttpException(`User con email ${email} not found`, HttpStatus.NOT_FOUND);

        if(!await compare(passwd, finded.passwd)) 
        throw new HttpException(`Password ${passwd} incorrect`, HttpStatus.FORBIDDEN);

        return { ...finded["_doc"], token };
    }
}
