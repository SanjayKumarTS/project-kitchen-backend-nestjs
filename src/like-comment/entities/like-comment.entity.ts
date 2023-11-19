import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false, versionKey: false })
export class Comment {
  @Prop({ required: true, type: String })
  user: string;
  @Prop({ required: true, type: String })
  comment: string;
}

export type CommentDocument = Comment & Document;
export const CommentSchema = SchemaFactory.createForClass(Comment);

@Schema({ versionKey: false, timestamps: true })
export class LikeComment {
  @Prop({ required: true, unique: true, type: String })
  recipeId: string;
  @Prop({ type: [String] })
  likes: Array<string>;
  @Prop({ type: [CommentSchema] })
  comments: Array<Comment>;
}

export type LikeCommentDocument = LikeComment & Document;
export const LikeCommentSchema = SchemaFactory.createForClass(LikeComment);
