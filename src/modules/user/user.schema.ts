import { MongooseModule } from '@nestjs/mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: '_vk' }) 
export class User { 
  @Prop({unique:true}) user: string;
  @Prop({unique:true}) email: string;
  @Prop() passwd: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
export const UserFeatured = MongooseModule.forFeature([
  { name: User.name, schema: UserSchema }
]);