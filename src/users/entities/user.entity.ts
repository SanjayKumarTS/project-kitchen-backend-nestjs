import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';

@Schema({ timestamps: true, versionKey: false })
export class User {
  @Prop({ required: true, default: () => randomUUID(), unique: true })
  uuid: string;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  email: string;
  @Prop()
  photoURL: string;
  @Prop()
  tags: Array<string>;
  @Prop()
  favorites: Array<string>;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
