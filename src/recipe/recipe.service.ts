import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findRecipesOfUser(
    recipesOfUserDTO: FindRecipeDTO,
  ): Promise<ResponseFindRecipesForUserDTO[]> {
    const authorInfo = await this.usersService.findOne(
      recipesOfUserDTO.authorId,
    );
    if (!authorInfo) {
      throw new NotFoundException(
        `User with UUID ${recipesOfUserDTO.uuid} not found`,
      );
    }
    const recipes = await this.recipeRepository.findRecipe({
      authorId: recipesOfUserDTO.authorId,
      name: null,
      uuid: null,
      page: null,
    });
    const allRecipes: ResponseFindRecipesForUserDTO[] = await Promise.all(
      recipes.recipes.map(async (recipe) => {
        const likesCount = await this.likeCommentService.getLikeCount(
          recipe.uuid,
        );
        const commentsCount = await this.likeCommentService.getCommentsCount(
          recipe.uuid,
        );

        const likeComment = await this.likeCommentService.getLike(recipe.uuid);

        var userLiked = likeComment?.likes.includes(recipesOfUserDTO.authorId);

        if (userLiked === undefined) {
          userLiked = false;
        }

        return {
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
          userLiked: userLiked,
        };
      }),
    );

    return allRecipes;
  }

  async findRecipesForUser(recipesForUserDTO: FindRecipesForUserDTO) {
    const followedUsers = await this.followersFollowingService.getFollowing(
      recipesForUserDTO.uuid,
    );
    let allRecipes: ResponseFindRecipesForUserDTO[] = [];
    let addedRecipeUUIDs = new Set();

    for (const user of followedUsers) {
      const recipes = await this.recipeRepository.findRecipe({
        authorId: user.followingId,
        name: null,
        uuid: null,
        page: null,
      });
      for (const recipe of recipes.recipes) {
        if (!addedRecipeUUIDs.has(recipe.uuid)) {
          addedRecipeUUIDs.add(recipe.uuid);
          const likesCount = await this.likeCommentService.getLikeCount(
            recipe.uuid,
          );
          const commentsCount = await this.likeCommentService.getCommentsCount(
            recipe.uuid,
          );
          const authorInfo = await this.usersService.findOne(user.followingId);

          const likeComment = await this.likeCommentService.getLike(
            recipe.uuid,
          );

          var userLiked = likeComment?.likes.includes(recipesForUserDTO.uuid);

          if (userLiked === undefined) {
            userLiked = false;
          }

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
            userLiked: userLiked,
          };
          allRecipes.push(recipeResponse);
        }
      }
    }

    if (allRecipes.length === 0) {
      const randomRecipes = await this.recipeRepository.findRandomRecipes(
        10,
        recipesForUserDTO.uuid,
      );
      for (const recipe of randomRecipes) {
        if (!addedRecipeUUIDs.has(recipe.uuid)) {
          addedRecipeUUIDs.add(recipe.uuid);
          const authorInfo = await this.usersService.findOne(recipe.authorId);
          const likeComment = await this.likeCommentService.getLike(
            recipe.uuid,
          );

          var userLiked = likeComment?.likes.includes(recipesForUserDTO.uuid);

          if (userLiked === undefined) {
            userLiked = false;
          }

          allRecipes.push({
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
            likesCount: await this.likeCommentService.getLikeCount(recipe.uuid),
            commentsCount: await this.likeCommentService.getCommentsCount(
              recipe.uuid,
            ),
            userLiked: userLiked,
          });
        }
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

  async searchRecipeByCategory(category: string) {
    const recipes = await this.recipeRepository.findRecipeByCategory(category);

    if (!recipes || recipes.length === 0) {
      return [];
    }

    const allRecipes: ResponseFindRecipesForUserDTO[] = await Promise.all(
      recipes.map(async (recipe) => {
        // Assume getLikeCount and getCommentsCount methods are available in likeCommentService
        const likesCount = await this.likeCommentService.getLikeCount(
          recipe.uuid,
        );
        const commentsCount = await this.likeCommentService.getCommentsCount(
          recipe.uuid,
        );

        // Fetch the author information for each recipe
        const authorInfo = await this.usersService.findOne(recipe.authorId);

        // Construct the response DTO
        return {
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
          userLiked: false,
        };
      }),
    );

    return allRecipes;
  }

  async searchRecipe(name: string) {
    const findRecipeDTO: FindRecipeDTO = {
      authorId: null,
      name: name,
      page: null,
      uuid: null,
    };
    const recipes = (await this.recipeRepository.findRecipe(findRecipeDTO))
      .recipes;

    if (!recipes || recipes.length === 0) {
      return [];
    }

    const allRecipes: ResponseFindRecipesForUserDTO[] = await Promise.all(
      recipes.map(async (recipe) => {
        // Assume getLikeCount and getCommentsCount methods are available in likeCommentService
        const likesCount = await this.likeCommentService.getLikeCount(
          recipe.uuid,
        );
        const commentsCount = await this.likeCommentService.getCommentsCount(
          recipe.uuid,
        );

        // Fetch the author information for each recipe
        const authorInfo = await this.usersService.findOne(recipe.authorId);

        // Construct the response DTO
        return {
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
          userLiked: false,
        };
      }),
    );

    return allRecipes;
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
