import { Controller, Post, Get, Body, Headers } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterAuthDto, LoginEmailAuthDto, LoginUsernameAuthDto, LoginTlfnAuthDto, } from './auth.dto'; /* TokenAuthenticationDto */

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    /**
     * Registra un usuario en la aplicación.
     * #param userObject - Objeto RegisterAuthDto con los datos del usuario a registrar.
     */
    @Post('/register')
    registerUser(@Body() userObject: RegisterAuthDto) {
        return this.authService.register(userObject);
    }

    /**
     * Inicia sesión de un usuario en la aplicación utilizando el correo electrónico.
     * #param userObjectLogin - Objeto LoginEmailAuthDto con los datos del usuario a autenticar.
     */
    @Post('/login/email')
    loginWithEmail(@Body() userObjectLogin: LoginEmailAuthDto) {
        return this.authService.loginWithEmail(userObjectLogin);
    }

    /**
     * Inicia sesión de un usuario en la aplicación utilizando el nombre de usuario.
     * #param userObjectLogin - Objeto LoginUsernameAuthDto con los datos del usuario a autenticar.
     */
    @Post('/login/username')
    loginWithUsername(@Body() userObjectLogin: LoginUsernameAuthDto) {
        return this.authService.loginWithUsername(userObjectLogin);
    }

    /**
     * Inicia sesión de un usuario en la aplicación utilizando el número de teléfono.
     * #param userObjectLogin - Objeto LoginTlfnAuthDto con los datos del usuario a autenticar.
     */
    @Post('/login/tlfn')
    loginWithTlfn(@Body() userObjectLogin: LoginTlfnAuthDto) {
        return this.authService.loginWithTlfn(userObjectLogin);
    }

    /**
     * Inicia sesión de un usuario en la aplicación utilizando Google.
     */
    @Get('/login/google')
    loginWithGoogle() {
        return this.authService.loginWithGoogle();
    }

    @Get('/expiration')
    checkTokenExpiration(@Headers('authorization') token: string) {
        return this.authService.checkTokenExpiration(token);
    }

    @Get('/user-info')
    getUserInfoByToken(@Headers('authorization') token: string) {
        return this.authService.getUserInfoByToken(token);
    }
}