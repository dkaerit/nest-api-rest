import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument, UserDto } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  /**
   * #brief crea un usuario en la colección "users"
   * #param userDto, objeto de transferencia con la ifnormación del usurio 
   * #return entrada generada en la base de datos
   */
  public async createUser(userDto: UserDto): Promise<User> {
    return new this.userModel(userDto).save();
  }
  
  /**
   * #brief obtiene todas las entradas de la colección "users"
   * #return lista de usuarios
   */
  public async readUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }


}
