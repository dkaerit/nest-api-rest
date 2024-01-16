import { MongooseModule } from '@nestjs/mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// @Schema: Define la estructura de los datos en la base de datos MongoDB para el modelo "User".

@Schema({ versionKey: '_vk' }) 
export class User { 
  @Prop({ unique: true }) username: string;
  @Prop({ unique: true }) email: string;
  @Prop() passwd: string;
  @Prop() avatar: string; 
  @Prop() nickname: string; 
}

export type UserDocument = User & Document; // Tipo UserDocument: Define la estructura de un documento de usuario en la base de datos.
export const UserSchema = SchemaFactory.createForClass(User); // UserSchema: Crea un Schema Mongoose basado en la definición de la clase "User".
export const UserFeatured = MongooseModule.forFeature([ // UserFeatured: Proporciona el modelo de usuario para su uso en el módulo "UserModule".
  { name: User.name, schema: UserSchema }
]);