import { Controller, Post, Get, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterAuthDto, LoginAuthDto } from './auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    /**
     * #brief, Registra un usuario en la aplicación
     * #param userObject: RegisterAuthDto, objeto con los datos del usuario a registrar
     */
    @Post('/register') registerUser(@Body() userObject: RegisterAuthDto) {
     return this.authService.register(userObject);
    }

    /**
     * #brief, Inicia sesión de un usuario en la aplicación
     * #param userObjectLogin: LoginAuthDto, objeto con los datos del usuario a autenticar
     */
    @Post('/jwt') loginJWT(@Body() userObjectLogin: LoginAuthDto) {
        return this.authService.loginJWT(userObjectLogin);  
    }

    /**
     * #brief, Inicia sesión de un usuario en la aplicación
     * #param userObjectLogin: LoginAuthDto, objeto con los datos del usuario a autenticar
     */
    @Get('/google') loginWithGoogle() {
        return this.authService.loginWithGoogle();  
    }
}
