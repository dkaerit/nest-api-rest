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

  /**
   * Ruta para verificar la existencia de un usuario o email en la base de datos.
   * #param body, cuerpo de la petición con el email o username a verificar
   * #return, objeto con la propiedad "exists" que indica si el usuario o email existe
   */
  @Post('/check-existence')
  @HttpCode(HttpStatus.OK)
  async checkUserExistence(@Body() body: { email?: string; username?: string }): Promise<{ email?: string; username?: string }> {
    const { email, username } = body;
  
    try {
      const conflicts: { email?: string; username?: string } = {
        email: email && (await this.userService.readUserByEmail(email)) ? email : undefined,
        username: username && (await this.userService.readUserByUsername(username)) ? username : undefined,
      };
  
      return conflicts;
  
    } catch (error) {
      if (error instanceof HttpException && error.getStatus() === HttpStatus.NOT_FOUND) return {}; // Devuelve un objeto vacío si ninguno existe
      throw error;
    }
  }
  
  
  


}
