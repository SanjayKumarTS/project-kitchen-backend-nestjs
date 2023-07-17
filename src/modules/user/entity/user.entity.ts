import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, default: randomUUID(), unique: true })
  uuid: string;

  @Prop({ required: true })
  name: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
