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
   * #brief encuentra un usuario en la base de datos dado un username
   * #param username, string con el nombre del usuario
   * #return usario encontrado
   */
  public async readUserByUsername(username:string): Promise<UserDto> {
    const name = username.replace(':', '');
    const finded = await this.userModel.findOne({user:name}).exec(); 
    const keysToDelete = ["passwd"];
    if(!finded) throw new HttpException(`User '${name}' not found`, HttpStatus.NOT_FOUND);
    return omit(finded.toObject(), keysToDelete);
  }

  /**
   * #brief encuentra un usuario en la base de datos dado un email
   * #param email, string con el email del usuario
   * #return usario encontrado
   */
  public async readUserByEmail(email:string): Promise<UserDto> {
    const finded = await this.userModel.findOne({email}).exec(); 
    if(!finded) throw new HttpException(`User with email '${email}' not found`, HttpStatus.NOT_FOUND);
    return finded;
  }


}
