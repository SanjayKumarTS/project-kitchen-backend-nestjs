import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from '../dto/create-recipe.dto';
import { UpdateRecipeDto } from '../dto/update-recipe.dto';
import mongoose, { Model } from 'mongoose';
import { Recipe } from '../entities/recipe.entity';
import { InjectModel } from '@nestjs/mongoose';
import { FindRecipeDTO } from '../dto/find-recipe.dto';

@Injectable()
export class RecipeRepository {
  constructor(
    @InjectModel('Recipes') private readonly recipeModel: Model<Recipe>,
  ) {}
  async create(createRecipeDto: CreateRecipeDto): Promise<CreateRecipeDto> {
    return await this.recipeModel.create(createRecipeDto);
  }

  async exists(id: string): Promise<Boolean> {
    const result = this.recipeModel.exists({ uuid: id });
    return result ? true : false;
  }

  async findRandomRecipes(
    count: number,
    excludeAuthorId: string,
  ): Promise<Recipe[]> {
    return this.recipeModel.aggregate([
      { $match: { authorId: { $ne: excludeAuthorId } } },
      { $sample: { size: count } },
    ]);
  }

  async findRecipeByCategory(category: string) {
    const recipes = await this.recipeModel.find({
      tags: new RegExp(category, 'i'),
    });

    return recipes;
  }

  async findRecipe(findRecipeDTO: FindRecipeDTO) {
    const pageNumber: number = +findRecipeDTO.page || 1;
    const totalResultsPerPage = 10;

    const skip = (pageNumber - 1) * totalResultsPerPage;
    const query: any = {};

    if (findRecipeDTO.uuid) {
      query.uuid = findRecipeDTO.uuid;
    }

    if (findRecipeDTO.authorId) {
      query.authorId = findRecipeDTO.authorId;
    }

    if (findRecipeDTO.name) {
      query.name = new RegExp(findRecipeDTO.name, 'i');
    }
    const totalResults = await this.recipeModel.countDocuments(query);
    const totalPages = Math.ceil(totalResults / totalResultsPerPage);

    const recipes = await this.recipeModel
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(totalResultsPerPage)
      .exec();

    return {
      recipes,
      currentPage: pageNumber,
      totalPages,
      totalResults,
    };
  }

  async findMostRecentRecipe(): Promise<Recipe> {
    return this.recipeModel.findOne().sort({ createdAt: -1 }).exec();
  }

  async update(id: number, updateRecipeDto: UpdateRecipeDto) {
    return await this.recipeModel.findByIdAndUpdate(id);
  }

  async remove(id: string) {
    return await this.recipeModel.deleteOne({ uuid: id });
  }
}
