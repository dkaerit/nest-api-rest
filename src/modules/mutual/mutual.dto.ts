
import { IsString, IsNotEmpty, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// create-mutual
export class CreateMutualDto {
  @ApiProperty() @IsNotEmpty() @IsString() userId1: string;
  @ApiProperty() @IsNotEmpty() @IsString() userId2: string;
  @ApiProperty() @IsNotEmpty() @IsString() @IsIn(['character', 'user']) relationshipType: string;
  @ApiProperty() @IsNotEmpty() @IsString() @IsIn(['pending', 'active']) status: string;
}

// delete-mutual
export class DeleteMutualDto {
   @ApiProperty() @IsNotEmpty() @IsString() mutualId: string;
 }