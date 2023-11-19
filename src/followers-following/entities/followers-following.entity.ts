import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class FollowersFollowing {
  @Prop({ type: String, required: true })
  followerId: string;
  @Prop({ type: String, required: true })
  followingId: string;
}

export const FollowersFollowingSchema =
  SchemaFactory.createForClass(FollowersFollowing);
