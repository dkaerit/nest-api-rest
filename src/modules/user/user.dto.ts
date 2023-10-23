import { RegisterAuthDto } from './../auth/auth.dto';
import { PartialType } from '@nestjs/swagger';

// Define una clase "UserDto" que se utiliza para representar información de usuarios.
// "UserDto" hereda de "RegisterAuthDto"
export class UserDto extends PartialType(RegisterAuthDto) {};