import { IsEmail, MaxLength, MinLength, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class LoginAuthDto {
    @IsEmail() readonly "email": string;
    @MinLength(4) @MaxLength(12) readonly "passwd": string;
}

export class RegisterAuthDto extends PartialType(LoginAuthDto) {
    @IsNotEmpty() readonly "user": string;
}

export class UserTokenized extends PartialType(RegisterAuthDto) {
    readonly "token": string;
}