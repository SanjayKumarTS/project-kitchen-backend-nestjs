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
  nutrition: Array<NutritionDto>;
  @IsNumber()
  preparationTime: number;
  @IsNumber()
  cookTime: number;
  @IsString()
  photo: string;
  tags: Array<string>;
}

export class IngredientsDto {
  @IsString()
  name: string;
  @IsNumber()
  quantity: string;
  @IsString()
  unit: string;
  @IsString()
  note: string;
}

export class NutritionDto {
  @IsString()
  label: string;
  @IsString()
  value: string;
  @IsString()
  unit: string;
}
