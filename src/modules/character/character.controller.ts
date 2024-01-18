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

  @Get('id:pjid')
  async getCharacterById(@Param('pjid') pjid: string): Promise<Character> {
    pjid = pjid.replace(':', '');
    return this.characterService.getCharacterById(pjid);
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

  @Get('fetch:userId')
  @HttpCode(HttpStatus.OK)
  async fetchCharactersByUserId(@Param('userId') userId: string): Promise<Character[]> {
    try {
      // Obtiene todos los personajes del usuario por su _id
      userId = userId.replace(':', '');
      const characters = await this.characterService.getCharactersByUserId(userId);
      return characters;
    } catch (error) {
      // Maneja cualquier error que pueda ocurrir durante la obtención de personajes por userId
      throw new HttpException('Error al obtener los personajes por userId', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


}
