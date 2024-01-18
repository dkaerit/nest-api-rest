// src/characters/controllers/characters.controller.ts
import { Controller, Get, Delete, Post, Body, HttpStatus, HttpCode, Param, UseGuards, HttpException, Query } from '@nestjs/common';
import { MutualService } from './mutual.service';
import { Mutual } from './mutual.schema';
import { CreateMutualDto, DeleteMutualDto } from './mutual.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('mutuals')
@Controller('mutuals')
export class MutualController {
  constructor(private readonly mutualService: MutualService) { }

  /**
   * Endpoint para obtener todos los registros de mutuals.
   * #returns Lista de mutuals.
   */
  @Get()
  getAllMutuals(): Promise<Mutual[]> {
    return this.mutualService.getAllMutuals();
  }

  /**
   * Endpoint para obtener todos los mutuals de un usuario específico.
   * #param userId ID del usuario para el cual se obtienen los mutuals.
   * #returns Lista de mutuals del usuario.
   */
  @Get('id:userId')
  getUserMutuals(@Param('userId') userId: string): Promise<Mutual[]> {
    userId = userId.replace(':', '');
    return this.mutualService.getUserMutuals(userId);
  }

  /**
   * Endpoint para crear un nuevo mutual.
   * #param createMutualDto Datos para crear un mutual.
   * #returns El mutual creado.
   */
  @Post('create')
  createMutual(@Body() createMutualDto: CreateMutualDto): Promise<Mutual> {
    console.log(createMutualDto);
    return this.mutualService.createMutual(createMutualDto);
  }

  /**
   * Endpoint para eliminar un mutual.
   * #param mutualId ID del mutual a eliminar.
   * #returns El mutual eliminado.
   */
  @Delete('delete/id:mutualId')
  deleteMutual(@Param('mutualId') mutualId: string): Promise<Mutual> {
    mutualId = mutualId.replace(':', '');
    return this.mutualService.deleteMutual(mutualId);
  }

  /**
   * Endpoint para eliminar un mutual por el par de userIds.
   * #param query Objeto de consulta con userId1 y userId2.
   * #returns El mutual eliminado.
   */
  @Delete('delete/pair')
  deleteMutualByPair(@Query() query: { userId1: string; userId2: string }): Promise<Mutual> {
    return this.mutualService.deleteMutualByPair(query.userId1, query.userId2);
  }
}