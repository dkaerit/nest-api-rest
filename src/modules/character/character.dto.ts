// src/characters/dto/character.dto.ts
import { IsNotEmpty, IsString, IsArray, IsOptional } from 'class-validator';

export class CharacterFieldDto {
  @IsNotEmpty() @IsString() fieldName: string;
  @IsNotEmpty() @IsString() data: string;
}

export class CharacterDto {
  @IsNotEmpty() @IsString() ownerId: string;
  @IsNotEmpty() @IsString() avatar: string;
  @IsNotEmpty() @IsString() bio: string;
  @IsNotEmpty() @IsString() nickname: string;
  @IsNotEmpty() @IsString() pjname: string;
  @IsOptional() @IsArray() shortFields?: CharacterFieldDto[];
  @IsOptional() @IsArray() longFields?: CharacterFieldDto[];
}

export class UpdateCharacterDto {
   @IsOptional() @IsString() avatar?: string;
   @IsOptional() @IsString() bio?: string;
   @IsOptional() @IsString() nickname?: string;
   @IsOptional() @IsString() pjname?: string;
 }



