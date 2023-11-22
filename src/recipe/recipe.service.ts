import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { RecipeRepository } from './repository/recipe.repository';
import { Recipe } from './entities/recipe.entity';
import { UsersService } from 'src/users/users.service';
import { FindRecipeDTO } from './dto/find-recipe.dto';
import { plainToInstance } from 'class-transformer';
import { FindRecipesForUserDTO } from './dto/recipesForUserDTO';
import { FollowersFollowingService } from 'src/followers-following/followers-following.service';
import { LikeCommentService } from 'src/like-comment/like-comment.service';
import { ResponseFindRecipesForUserDTO } from './dto/ResponseFindRecipesForUserDTO';

@Injectable()
export class RecipeService {
  constructor(
    private readonly recipeRepository: RecipeRepository,
    private readonly usersService: UsersService,
    private readonly followersFollowingService: FollowersFollowingService,
    private readonly likeCommentService: LikeCommentService,
  ) {}
  async create(createRecipeDto: CreateRecipeDto) {
    let author = await this.usersService.findOne(createRecipeDto.authorId);
    if (!author) {
      throw new Error('Author Not found');
    }

    return await this.recipeRepository.create(createRecipeDto);
  }

  async findRecipesForUser(recipesForUserDTO: FindRecipesForUserDTO) {
    const followedUsers = await this.followersFollowingService.getFollowing(
      recipesForUserDTO.uuid,
    );
    let allRecipes: ResponseFindRecipesForUserDTO[] = [];
    for (const user of followedUsers) {
      const recipes = await this.recipeRepository.findRecipe({
        authorId: user.followingId,
        name: null,
        uuid: null,
        page: null,
      });
      for (const recipe of recipes.recipes) {
        const likesCount = await this.likeCommentService.getLikeCount(
          recipe.uuid,
        );
        const commentsCount = await this.likeCommentService.getCommentsCount(
          recipe.uuid,
        );
        const authorInfo = await this.usersService.findOne(user.followingId);

        const recipeResponse: ResponseFindRecipesForUserDTO = {
          uuid: recipe.uuid,
          author: {
            uuid: authorInfo.uuid,
            name: authorInfo.name,
            photo: authorInfo.photoURL,
          },
          recipe: {
            name: recipe.name,
            description: recipe.description,
            photo: recipe.photo,
            creationTime: recipe.createdAt.toString(),
          },
          likesCount,
          commentsCount,
        };
        allRecipes.push(recipeResponse);
      }
    }

    allRecipes.sort((a, b) => {
      const creationTimeA = new Date(a.recipe.creationTime).getTime();
      const creationTimeB = new Date(b.recipe.creationTime).getTime();
      return creationTimeB - creationTimeA;
    });

    return allRecipes;
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
