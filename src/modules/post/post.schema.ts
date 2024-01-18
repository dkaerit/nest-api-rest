import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop({ required: true, index: true }) authorId: string;
  @Prop({ enum: ['user', 'character'], default: 'user', index: true }) authorType: string; // Nuevo campo para indicar si el autor es un usuario o un personaje
  @Prop({ required: true }) content: string;
  @Prop({ type: [{ type: String, ref: 'User' }] }) referencedUsers: string[]; // Lista de IDs de usuarios a los que hace referencia la publicación
  @Prop({ type: Map, of: Number, default: {} }) diceResult: Record<string, number>; // Resultado de tiradas de dados asociadas
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Comment' }], index: true }) comments: MongooseSchema.Types.ObjectId[];
  @Prop({ default: Date.now, index: true }) createdAt: Date;
  @Prop({ default: Date.now }) updatedAt: Date;
}

export type CharacterDocument = Post & Document;
export const PostSchema = SchemaFactory.createForClass(Post);
export const PostFeatured = MongooseModule.forFeature([ // UserFeatured: Proporciona el modelo de usuario para su uso en el módulo "UserModule".
  { name: Post.name, schema: PostSchema }
]);
