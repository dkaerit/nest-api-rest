// src/characters/controllers/characters.controller.ts
import { Controller, Get, Put, Post, Body, HttpStatus, HttpCode, Param, UseGuards, HttpException } from '@nestjs/common';
import { CharacterService } from './character.service';
import { Character } from './character.schema';
import { CharacterDto, UpdateCharacterDto } from './character.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('characters')
@Controller('characters')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async createCharacter(@Body() body: CharacterDto): Promise<Character> {
    return this.characterService.createCharacter(body);
  }

  @Get('read:pjname')
  async getCharacterByName(@Param('pjname') pjname: string): Promise<Character> {
    pjname = pjname.replace(':', '');
    return this.characterService.getCharacterByName(pjname);
  }

  @Put('update:pjname')
  @HttpCode(HttpStatus.OK)
  async updateCharacter(@Param('pjname') pjname: string, @Body() datas: UpdateCharacterDto): Promise<Character> {
    pjname = pjname.replace(':', '');
    return this.characterService.updateCharacterById(pjname, datas);
  }

  @Get('check:nickname')
  @HttpCode(HttpStatus.OK)
  async checkNickname(@Param('nickname') nickname: string): Promise<boolean> {
    console.log("hola mundo")
    try {
      // Verifica la existencia del nickname en la base de datos
      nickname = nickname.replace(':', '');
      const character = await this.characterService.getCharacterByNickname(nickname);
      return !!character; // Devuelve un objeto indicando si el nickname existe
    } catch (error) {
      // Maneja cualquier error que pueda ocurrir durante la verificación del nickname
      throw new HttpException('Error al verificar el nickname', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
