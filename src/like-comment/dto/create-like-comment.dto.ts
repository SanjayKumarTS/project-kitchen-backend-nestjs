import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CommentDTO {
  @IsNotEmpty()
  @IsString()
  user: string;

  @IsNotEmpty()
  @IsString()
  comment: string;
}

export class CreateLikeCommentDTO {
  @IsNotEmpty()
  @IsString()
  recipeId: string;

  @IsArray()
  @IsString({ each: true })
  likes: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CommentDTO)
  comments: CommentDTO[];
}
