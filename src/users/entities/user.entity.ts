import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';

@Schema({ timestamps: true, versionKey: false })
export class User {
  @Prop({ required: true, default: () => randomUUID(), unique: true })
  uuid: string;
  @Prop({ required: true, type: String })
  name: string;
  @Prop({ required: true, type: String })
  email: string;
  @Prop({ type: String })
  photoURL: string;
  @Prop({ type: [String] })
  tags: Array<string>;
  @Prop({ type: [String] })
  favorites: Array<string>;
  @Prop({ type: String })
  bio: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
