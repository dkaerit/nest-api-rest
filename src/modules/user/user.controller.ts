import { JwtGuard } from '../../streategies/jwt/jwt.guard';
import { Controller, Get, Post, Body, HttpStatus, HttpCode, Param, UseGuards, HttpException } from '@nestjs/common';
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
  constructor(private readonly userService: UserService) { }

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
  @Get('/id:identifier')
  @HttpCode(HttpStatus.OK)
  async getUserById(@Param('identifier') identifier: string): Promise<UserDto> {
    const keysToDelete = ["passwd"];
    identifier = identifier.replace(':', '');
    return omit(await this.userService.findUserByField("_id", identifier), keysToDelete);
  }


  /**
   * #brief gestión de la petición post "/users/create" 
   * #return, lista de usuarios
   */
  @Get('/read:identifier')
  @HttpCode(HttpStatus.OK)
  async getUserByUsername(@Param('identifier') identifier: string): Promise<UserDto> {
    const keysToDelete = ["passwd"];
    identifier = identifier.replace(':', '');

    const identifiers = [
      { regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, handler: 'email' },
      { regex: /^[a-zA-Z0-9_]+$/, handler: 'username' },
      { regex: /^\d{10}$/, handler: 'tlfn' },
    ];

    const handler = (identifier: string) => (identifiers.find(({ regex }) => regex.test(identifier))).handler;

    return omit(await this.userService.findUserByField(handler(identifier), identifier), keysToDelete);
  }

  /**
   * Ruta para verificar la existencia de un usuario en la base de datos.
   * @param body, cuerpo de la petición con el username a verificar
   * @return, booleano que indica si el usuario existe
   */
  @Get('/checkuser:username')
  @HttpCode(HttpStatus.OK)
  async checkUserExistence(@Param('username') username: string): Promise<boolean> {
    try {
      const user = await this.userService.readUserByUsername(username);
      return !!user; // Devuelve true si el usuario existe, false si no
    } catch (err) {
      if (err.status == 404) return false;
    }
  }

  /**
   * Ruta para verificar la existencia de un correo electrónico en la base de datos.
   * @param body, cuerpo de la petición con el email a verificar
   * @return, booleano que indica si el correo electrónico existe
   */
  @Get('/checkmail:email')
  @HttpCode(HttpStatus.OK)
  async checkEmailExistence(@Param('email') email: string): Promise<boolean> {
    try {
      const user = await this.userService.readUserByEmail(email);
      return !!user; // Devuelve true si el correo electrónico existe, false si no
    } catch (err) {
      if (err.status == 404) return false;
    }

  }





}
