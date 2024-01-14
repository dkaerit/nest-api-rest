// src/characters/models/character.model.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';

@Schema({ versionKey: '_vk' })
export class CharacterField {
  @Prop({ required: true }) fieldName: string;
  @Prop({ required: true }) data: string;
}

@Schema({ versionKey: '_vk' })
export class Character {
  @Prop({ unique: true }) nickname: string;
  @Prop({ required: true }) ownerId: string;
  @Prop({ required: true }) pjname: string;
  @Prop() avatar: string;
  @Prop() bio: string;
  @Prop() shortFields: CharacterField[];
  @Prop() longFields: CharacterField[];
  @Prop({ default: Date.now }) createdAt: Date;
  @Prop({ default: Date.now }) updatedAt: Date;
}

export type CharacterDocument = Character & Document;
export const CharacterSchema = SchemaFactory.createForClass(Character);
export const CharacterFeatured = MongooseModule.forFeature([ // UserFeatured: Proporciona el modelo de usuario para su uso en el módulo "UserModule".
  { name: Character.name, schema: CharacterSchema }
]);