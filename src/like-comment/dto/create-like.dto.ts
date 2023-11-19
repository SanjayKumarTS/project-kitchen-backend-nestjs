import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLikeDto {
  @IsNotEmpty()
  @IsString()
  recipeId: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}
