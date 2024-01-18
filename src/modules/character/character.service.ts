import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Character, CharacterDocument } from './character.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateCharacterDto, CharacterDto } from './character.dto';

@Injectable()
export class CharacterService {
  constructor(@InjectModel(Character.name) private characterModel: Model<CharacterDocument>) { }

  /**
  * Crea un nuevo personaje.
  * #param createCharacterDto Datos del personaje a crear.
  * #returns El personaje creado.
  */
  async createCharacter(character: CharacterDto): Promise<Character> {
    // lógica para crear un personaje
    return new this.characterModel({
      ...character
    }).save();
  }

  /**
  * Obtiene un personaje por su nombre.
  * #param name Nombre del personaje.
  * #returns El personaje encontrado.
  */
  async getCharacterByName(name: string): Promise<Character> {
    try {
      const character = await this.characterModel.findOne({ nickname: name }).exec();

      if (!character) 
        throw new HttpException('Personaje no encontrado', HttpStatus.NOT_FOUND);

      return character;
    } catch (error) {
      console.error('Error al buscar el personaje por nombre:', error);
      throw error;
    }
  }

  async getCharacterById(id: string): Promise<Character> {
    try {
      const character = await this.characterModel.findOne({ _id: id }).exec();

      if (!character) 
        throw new HttpException('Personaje no encontrado', HttpStatus.NOT_FOUND);

      return character;
    } catch (error) {
      throw error;
    }
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

  /**
   * Obtiene un personaje por su nickname.
   * #param nickname Nickname del personaje.
   * #returns El personaje encontrado o null si no existe.
   */
  async getCharacterByNickname(nickname: string): Promise<Character | null> {
    try {
      return this.characterModel.findOne({ nickname }).exec();
    } catch (error) {
      // Maneja cualquier error que pueda ocurrir durante la búsqueda del personaje por nickname
      throw new HttpException('Error al obtener el personaje por nickname', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Obtiene todos los personajes de un usuario por su _id.
   * #param userId _id del usuario.
   * #returns Un array con todos los personajes del usuario o un array vacío si no tiene personajes.
   */
  async getCharactersByUserId(userId: string): Promise<Character[]> {
    try {
      return await this.characterModel.find({ ownerId: userId }).exec();
    } catch (error) {
      // Maneja cualquier error que pueda ocurrir durante la búsqueda de personajes por userId
      throw new HttpException('Error al obtener los personajes por userId', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}