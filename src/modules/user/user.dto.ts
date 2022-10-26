import { RegisterAuthDto } from './../auth/auth.dto';
import { PartialType } from '@nestjs/swagger';

export class UserDto extends PartialType(RegisterAuthDto) {};