// mutual.model.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';

@Schema({ versionKey: '_vk' })
export class Mutual extends Document {
  @Prop({ required: true, type: String }) userId1: string;
  @Prop({ required: true, type: String }) userId2: string;
  @Prop({ required: true, type: String }) relationshipType: string; 
  @Prop({ default: 'pending' }) status: string;
}

export type MutualDocument = Mutual & Document;
export const MutualSchema = SchemaFactory.createForClass(Mutual);

MutualSchema.index({ userId1: 1, userId2: 1 }, { unique: true }); // Índice compuesto para userId1 y userId2

export const MutualFeatured = MongooseModule.forFeature([ 
  { name: Mutual.name, schema: MutualSchema }
]);