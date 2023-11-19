import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import { type } from 'os';

@Schema({ _id: false, versionKey: false })
export class Ingredients {
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: String, required: false })
  quantity: string;
  @Prop({ type: String, required: false })
  unit: string;
  @Prop({ type: String })
  note: string;
}

@Schema({ _id: false, versionKey: false })
export class Nutrition {
  @Prop({ required: true, type: String })
  label: string;
  @Prop({ required: false, type: String })
  value: string;
  @Prop({ required: false, type: String })
  unit: string;
}

export type IngredientsDocument = Ingredients & Document;
export const IngredientsSchema = SchemaFactory.createForClass(Ingredients);

export type NutritionDocument = Nutrition & Document;
export const NutritionSchema = SchemaFactory.createForClass(Nutrition);

@Schema({ timestamps: true, versionKey: false })
export class Recipe {
  @Prop({ required: true, default: () => randomUUID(), unique: true })
  uuid: string;
  @Prop({ required: true, type: String })
  authorId: string;
  @Prop({ required: true, type: String })
  name: string;
  @Prop({ required: true, type: String })
  description: string;
  @Prop({ required: true, type: [IngredientsSchema] })
  ingredients: Array<Ingredients>;
  @Prop({ required: true, type: [String] })
  instructions: Array<string>;
  @Prop({ required: true, type: [NutritionSchema] })
  nutrition: Array<Nutrition>;
  @Prop({ required: true, type: Number })
  preparationTime: number;
  @Prop({ required: true, type: Number })
  cookTime: number;
  @Prop({ required: true, type: String })
  photo: string;
  @Prop({ type: [String] })
  tags: Array<string>;
}

export type RecipeDocument = Recipe & Document;
export const RecipeSchema = SchemaFactory.createForClass(Recipe);
