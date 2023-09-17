import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';

@Schema({ _id: false, versionKey: false })
export class Ingredients {
  @Prop({ required: true })
  @IsString()
  name: string;
  @Prop({ required: true })
  @IsString()
  quantity: string;
  @Prop({ required: true })
  @IsString()
  unit: string;
  @Prop()
  @IsString()
  note: string;
}

@Schema({ _id: false, versionKey: false })
export class Nutrition {
  @Prop({ required: true })
  @IsString()
  label: string;
  @Prop({ required: true })
  @IsString()
  value: string;
  @Prop({ required: true })
  @IsString()
  unit: string;
}

@Schema({ timestamps: true, versionKey: false })
export class Recipe {
  @Prop({ required: true })
  authorId: string;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  @IsArray()
  @ValidateNested()
  @Type(() => Ingredients)
  ingredients: Array<Ingredients>;
  @Prop({ required: true })
  @IsArray()
  @ValidateNested()
  @Type(() => String)
  instructions: Array<string>;
  @Prop({ required: true })
  @IsArray()
  @ValidateNested()
  @Type(() => Nutrition)
  nutrition: Array<Nutrition>;
  @Prop({ required: true })
  preparationTime: number;
  @Prop({ required: true })
  cookTime: number;
  @Prop({ required: true })
  @IsString()
  photo: string;
  @Prop()
  @IsArray()
  @ValidateNested()
  @Type(() => String)
  tags: Array<string>;
}

export type RecipeDocument = Recipe & Document;
export const RecipeSchema = SchemaFactory.createForClass(Recipe);

export type IngredientsDocument = Ingredients & Document;
export type NutritionDocument = Nutrition & Document;
