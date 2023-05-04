import { IsEmail, MaxLength, MinLength, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';

export class LoginAuthDto {
    @ApiProperty() @IsEmail() readonly "email": string; // email solo ectura
    @ApiProperty() @MinLength(4) @MaxLength(12) readonly "passwd": string; // passwd (4-12)
}

export class RegisterAuthDto extends PartialType(LoginAuthDto) {
    @ApiProperty() @IsNotEmpty() readonly "user": string; // user not empty
}

export class UserTokenized extends PartialType(RegisterAuthDto) {
    @ApiProperty() readonly "token": string; // token solo lectura
}