import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { UserDto } from './user.dto';
import { hash } from 'bcryptjs'; /* compare */
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

    // Crea un nuevo documento de usuario utilizando el modelo de usuario.
    // Guarda el nuevo documento de usuario en la base de datos y devuelve una promesa con el usuario creado.
    return new this.userModel({ 
      ...userObject, // Copia todos los campos del objeto del usuario.
      passwd: await hash(passwd, 10) // Realiza un hash de la contraseña antes de almacenarla.
    }).save();
  }
  
  /**
   * #brief obtiene todas las entradas de la colección "users"
   * #return lista de usuarios
   */
  public async readUsers(): Promise<UserDto[]> {
    const keysToDelete = ["passwd"];
    return this.userModel.find().exec().then(document => document.map(user => omit(user.toObject(), keysToDelete)));
  }

  /**
   * Encuentra un usuario en la base de datos dado un campo y un valor de búsqueda
   * #param field, string con el nombre del campo de búsqueda (username, email, tlfn)
   * #param value, valor a buscar en el campo especificado
   * #return usuario encontrado
   */
  public async findUserByField(field: string, value: string): Promise<UserDto> {
    value = value.replace(':', ''); // Elimina cualquier caracter ':' del valor proporcionado.
    const found = await this.userModel.findOne({ [field]: value }).exec(); // Realiza una búsqueda en la base de datos utilizando el campo y valor especificados.
    
    if (!found) // Verifica si se encontró un usuario, de lo contrario, lanza una excepción.
      throw new HttpException(`User with ${field} '${value}' not found`, HttpStatus.NOT_FOUND);

    return found.toObject(); // Convierte el usuario encontrado en un objeto de usuario y lo devuelve.
  }

  /**
   * #brief encuentra un usuario en la base de datos dado un username
   * #param username, string con el nombre del usuario
   * #return usuario encontrado
   */
  public async readUserByUsername(username: string): Promise<UserDto> {
    
    return this.findUserByField('username', username);
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

  public async readUserById(id: string): Promise<UserDto> {
    return this.findUserByField('_id', id);
  }



}
