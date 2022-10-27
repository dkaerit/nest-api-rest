import { UserService } from '../user/user.service';
import { UserDocument } from '../user/user.schema';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { RegisterAuthDto, LoginAuthDto, UserTokenized } from './auth.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
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
        const token = this.jwtService.sign({ _id:finded["_id"], user:finded["user"] });

        if(!finded) 
        throw new HttpException(`User con email ${email} not found`, HttpStatus.NOT_FOUND);

        if(!await compare(passwd, finded.passwd)) 
        throw new HttpException(`Password ${passwd} incorrect`, HttpStatus.FORBIDDEN);

        return { ...finded["_doc"], token };
    }
}
