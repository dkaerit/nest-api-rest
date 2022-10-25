import { MongooseModule } from '@nestjs/mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export class UserDto {
  readonly "user": string;
  readonly "email": string;
  readonly "passwd": string;
};


@Schema({ versionKey: '_vk' }) 
export class User { 
  @Prop() user: string;
  @Prop() email: string;
  @Prop() passwd: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
export const UserFeatured = MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]);