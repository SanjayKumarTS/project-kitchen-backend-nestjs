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

  async findRecipe(findRecipeDTO: FindRecipeDTO) {
    const pageNumber: number = +findRecipeDTO.page || 1;
    const totalResultsPerPage = 10;

    const skip = (pageNumber - 1) * totalResultsPerPage;
    const query: any = {};

    if (findRecipeDTO.id) {
      query._id = findRecipeDTO.id;
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

  async update(id: number, updateRecipeDto: UpdateRecipeDto) {
    return await this.recipeModel.findByIdAndUpdate(id);
  }

  async remove(id: number) {
    return await this.recipeModel.findByIdAndDelete(id);
  }
}
