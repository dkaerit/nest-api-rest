import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { UserDto } from './user.dto';
import { hash, compare } from 'bcrypt';
import { omit } from 'lodash';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  /**
   * #brief crea un usuario en la colección "users"
   * #param userDto, objeto de transferencia con la ifnormación del usurio 
   * #return entrada generada en la base de datos
   */
  public async createUser(userObject:UserDto): Promise<UserDocument> {
    const { passwd } = userObject;
    return new this.userModel({
      ...userObject, 
      passwd: await hash(passwd, 10)
    }).save();
  }
  
  /**
   * #brief obtiene todas las entradas de la colección "users"
   * #return lista de usuarios
   */
  public async readUsers(): Promise<UserDto[]> {
    const keysToDelete = ["passwd"];
    return this.userModel.find().exec()
    .then(document => document.map(user => omit(user.toObject(), keysToDelete)));
  }

  /**
   * #brief encuentra un usuario en la base de datos dado un campo y un valor de búsqueda
   * #param field, string con el nombre del campo de búsqueda (username, email, tlfn)
   * #param value, valor a buscar en el campo especificado
   * #return usuario encontrado
   */
  private async findUserByField(field: string, value: string): Promise<UserDto> {
    value = value.replace(':', '');

    const found = await this.userModel.findOne({ [field]: value }).exec();
    
    if (!found) 
    throw new HttpException(`User with ${field} '${value}' not found`, HttpStatus.NOT_FOUND);

    return found.toObject();
  }

  /**
   * #brief encuentra un usuario en la base de datos dado un username
   * #param username, string con el nombre del usuario
   * #return usuario encontrado
   */
  public async readUserByUsername(username: string): Promise<UserDto> {
    return this.findUserByField('user', username);
  }

  /**
   * #brief encuentra un usuario en la base de datos dado un email
   * #param email, string con el email del usuario
   * #return usuario encontrado
   */
  public async readUserByEmail(email: string): Promise<UserDto> {
    return this.findUserByField('email', email);
  }

  /**
   * #brief encuentra un usuario en la base de datos dado un número de teléfono
   * #param tlfn, string con el número de teléfono del usuario
   * #return usuario encontrado
   */
  public async readUserByTlfn(tlfn: string): Promise<UserDto> {
    return this.findUserByField('tlfn', tlfn);
  }



}
