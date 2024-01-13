import { Module } from '@nestjs/common';
import { CharacterController } from './character.controller';
import { CharacterService,  } from './character.service';
import { CharacterFeatured } from './character.schema';


@Module({
  imports: [CharacterFeatured],
  controllers: [CharacterController],
  providers: [CharacterService],
  exports: [CharacterService]
})
export class CharacterModule {}
