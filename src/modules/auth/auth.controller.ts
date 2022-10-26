import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterAuthDto, LoginAuthDto } from './auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    /**
     * #brief,
     * #param
     * #return
     */
    @Post('/register') registerUser(@Body() userObject: RegisterAuthDto) {
     return this.authService.register(userObject);
    }

    /**
     * #brief,
     * #param
     * #return
     */
    @Post('/login') loginUser(@Body() userObjectLogin: LoginAuthDto) {
        return this.authService.login(userObjectLogin);  
    }
}
