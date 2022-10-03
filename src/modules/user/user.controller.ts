import { Controller, Get, Post, Put, Delete, Res, Body } from '@nestjs/common';
import { UserService } from './user.service'
import { UserDTO } from './user.model';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('/create') createUser(@Res() res, @Body() user: UserDTO) {}
    @Get('/read') readAllUsers() {}
    @Get('/read:user') readUser() {}
    @Put('/update:user') updateUser() {}
    @Delete('/delete:user') deleteUser() {}
}
