import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateRecipeDto {
  @IsString()
  authorId: string;
  @IsString()
  name: string;
  @IsArray()
  ingredients: Array<IngredientsDto>;
  @IsArray()
  @IsString({ each: true })
  instructions: Array<string>;
  nutrition: NutritionDto;
  @IsString()
  photo: string;
  tags: Array<string>;
}

export class IngredientsDto {
  @IsString()
  name: string;
  @IsNumber()
  amount: string;
  @IsString()
  unit: string;
  @IsString()
  note: string;
}

export class NutritionDto {
  @IsString()
  calories: string;
  @IsString()
  protein: string;
}
