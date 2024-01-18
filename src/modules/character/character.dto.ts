// src/characters/dto/character.dto.ts
import { IsNotEmpty, IsString, IsArray, MinLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CharacterFieldDto {
  @IsNotEmpty() fieldName: string;
  @IsNotEmpty() data: string;
}

export class CharacterDto {
  @ApiProperty() @IsNotEmpty() @MinLength(4) readonly pjname: string;
  @ApiProperty() @IsNotEmpty() readonly avatar: string;
  @ApiProperty() @IsNotEmpty() readonly ownerId: string;
  @ApiProperty() @IsNotEmpty() readonly nickname: string;
  @ApiProperty() @IsOptional() readonly bio: string;
  @ApiProperty() @IsOptional() readonly shortFields?: CharacterFieldDto[];
  @ApiProperty() @IsOptional() readonly longFields?: CharacterFieldDto[];
}

export class UpdateCharacterDto {
   @IsOptional() @IsString() avatar?: string;
   @IsOptional() @IsString() bio?: string;
   @IsOptional() @IsString() nickname?: string;
   @IsOptional() @IsString() pjname?: string;
 }



