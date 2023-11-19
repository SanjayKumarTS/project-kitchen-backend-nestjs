import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { RecipeRepository } from './repository/recipe.repository';
import { Recipe } from './entities/recipe.entity';
import { UsersService } from 'src/users/users.service';
import { FindRecipeDTO } from './dto/find-recipe.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class RecipeService {
  constructor(
    private readonly recipeRepository: RecipeRepository,
    private readonly usersService: UsersService,
  ) {}
  async create(createRecipeDto: CreateRecipeDto) {
    let author = await this.usersService.findOne(createRecipeDto.authorId);
    if (!author) {
      throw new Error('Author Not found');
    }

    return await this.recipeRepository.create(createRecipeDto);
  }

  async createMany(createRecipeDtos: CreateRecipeDto[]): Promise<Recipe[]> {
    let createdRecipes: Recipe[] = [];

    for (const createRecipeDto of createRecipeDtos) {
      try {
        let author = await this.usersService.findOne(createRecipeDto.authorId);
        if (!author) {
          throw new Error('Author Not found');
        }

        const createdRecipe = await this.recipeRepository.create(
          createRecipeDto,
        );
        createdRecipes.push(plainToInstance(Recipe, createdRecipe));
      } catch (error) {
        console.error(`Error processing recipe: ${error.message}`);
      }
    }
    return createdRecipes;
  }

  async findRecipe(findRecipeDTO: FindRecipeDTO) {
    return await this.recipeRepository.findRecipe(findRecipeDTO);
  }

  async update(id: number, updateRecipeDto: UpdateRecipeDto) {
    return await this.recipeRepository.update(id, updateRecipeDto);
  }

  async remove(id: number) {
    return await this.recipeRepository.remove(id);
  }
}
