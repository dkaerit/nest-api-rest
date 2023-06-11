import { JwtGuard } from '../auth/jwt/jwt.guard';
import { Controller, Get, Post, Body, HttpStatus, HttpCode, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import { UserDto } from './user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { omit } from 'lodash';

// Parte de la infraestructura que se encarga de poder manejar lo que son las peticiones http
// Interactuar directame con la transferencia de información a nivel de peticiones
@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * #brief gestión de la petición post "/users/create" 
   * #param body, cuerpo de la petición (usuario dado)
   * #return, 
   */
  @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() body: UserDto) {
    return this.userService.createUser(body);
  }

  /**
   * #brief gestión de la petición post "/users/create" 
   * #return, lista de usuarios
   */
  @Get('/read')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  async getUsers(): Promise<UserDto[]> { 
    return await this.userService.readUsers()
  }

  /**
   * #brief gestión de la petición post "/users/create" 
   * #return, lista de usuarios
   */
  @Get('/read:user')
  @HttpCode(HttpStatus.OK)
  async getUser(@Param('user') username: string): Promise<UserDto> { 
    const keysToDelete = ["passwd"];
    return omit(await this.userService.readUserByUsername(username), keysToDelete);
  }


}
