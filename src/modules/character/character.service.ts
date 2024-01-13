import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Character, CharacterDocument } from './character.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateCharacterDto, CharacterDto } from './character.dto';

@Injectable()
export class CharacterService {
   constructor(@InjectModel(Character.name) private characterModel: Model<CharacterDocument>) {}

   /**
   * Crea un nuevo personaje.
   * #param createCharacterDto Datos del personaje a crear.
   * #returns El personaje creado.
   */
   async createCharacter(character: CharacterDto): Promise<Character> {
      // lógica para crear un personaje
      // ...
      const createdCharacter = new this.characterModel(character);
      return createdCharacter.save();
    }
  
   /**
   * Obtiene un personaje por su nombre.
   * #param name Nombre del personaje.
   * #returns El personaje encontrado.
   */
    async getCharacterByName(name: string): Promise<Character> {
      // la lógica para obtener un personaje por nombre
      // ...
      return;
    }
  
   /**
   * Obtiene un personaje por su nombre.
   * #param name Nombre del personaje.
   * #returns El personaje encontrado.
   */
    async updateCharacterById(pjname: string, datas: UpdateCharacterDto): Promise<Character> {
      const character = await this.characterModel.findByIdAndUpdate(
        pjname, { $set: datas }, { new: true }
      );
  
      if (!character) 
      throw new HttpException('Character not found', HttpStatus.NOT_FOUND);
      
  
      return character;
    }
}