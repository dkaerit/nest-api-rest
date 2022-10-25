import { Controller, Get, Post, Body, Res, Req, HttpStatus, HttpCode } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { UserDto, User } from './user.schema';


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
   * #return, 
   */
  @Get('/read')
  @HttpCode(HttpStatus.OK)
  async getUsers(): Promise<User[]> { 
    return await this.userService.readUsers()
  }


}
