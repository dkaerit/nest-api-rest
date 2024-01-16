import { IsEmail, MaxLength, MinLength, IsNotEmpty, IsArray, } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';


// Objeto de transferencia de datos para la información de login
export class LoginEmailAuthDto {
    @ApiProperty() @IsEmail() readonly "email": string; // email solo ectura
    @ApiProperty() @MinLength(4) @MaxLength(12) readonly "passwd": string; // passwd (4-12)
}

// Objeto de transferencia de datos para la información de inicio de sesión con nombre de usuario.
export class LoginUsernameAuthDto {
    @ApiProperty() readonly username: string;
    @ApiProperty() @MinLength(4) @MaxLength(12) readonly passwd: string;
}

// Objeto de transferencia de datos para la información de inicio de sesión con número de teléfono.
export class LoginTlfnAuthDto {
    @ApiProperty() readonly tlfn: string;
    @ApiProperty() @MinLength(4) @MaxLength(12) readonly passwd: string; 
}


// Objeto de transferencia de datos para la información de registro
export class RegisterAuthDto extends PartialType(LoginEmailAuthDto) {
    @ApiProperty() @IsNotEmpty() readonly username: string;
    @ApiProperty() readonly avatar: string;
    @ApiProperty() readonly nickname: string;
  }

// Objeto de transferencia de datos para la información de usuario tokenizado
export class UserTokenized extends PartialType(RegisterAuthDto) {
    @ApiProperty() readonly "token": string; // token solo lectura
}

export class TokenAuthenticationDto {
    @ApiProperty() readonly authentication: string;
  }