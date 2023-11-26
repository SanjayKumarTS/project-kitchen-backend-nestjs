import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLikeCommentDTO } from './dto/create-like-comment.dto';
import { UpdateLikeCommentDto } from './dto/update-like-comment.dto';
import { RecipeRepository } from 'src/recipe/repository/recipe.repository';
import { UserRepository } from 'src/users/repository/users.repository';
import { LikeCommentRepository } from './repository/like-comment.repository';
import { LikeComment } from './entities/like-comment.entity';
import { CreateLikeDto } from './dto/create-like.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class LikeCommentService {
  constructor(
    private readonly likeCommentRepository: LikeCommentRepository,
    private readonly userRepository: UserRepository,
    private readonly recipeRepository: RecipeRepository,
  ) {}

  async getLikeCount(recipeId: string) {
    const recipeExists = await this.recipeRepository.exists(recipeId);
    if (!recipeExists) {
      throw new NotFoundException(`Recipe with ID ${recipeId} not found`);
    }
    return this.likeCommentRepository.getLikeCount(recipeId);
  }

  async getLike(recipeId: string) {
    const recipeExists = await this.recipeRepository.exists(recipeId);
    if (!recipeExists) {
      throw new NotFoundException(`Recipe with ID ${recipeId} not found`);
    }
    return this.likeCommentRepository.getLike(recipeId);
  }

  async getCommentsWithUserInfo(recipeId: string) {
    const recipeExists = await this.recipeRepository.exists(recipeId);
    if (!recipeExists) {
      throw new NotFoundException(`Recipe with ID ${recipeId} not found`);
    }

    const likeComment = await this.likeCommentRepository.getComments(recipeId);

    if (!likeComment || likeComment.length === 0) {
      return [];
    }

    // Map over each comment to fetch user details
    const commentsWithUserInfo = await Promise.all(
      likeComment.map(async (comment) => {
        const user = await this.userRepository.findOne(comment.user);
        return {
          comment: comment.comment,
          userInfo: {
            name: user.name,
            photo: user.photoURL,
            uuid: user.uuid,
            bio: user.bio,
          },
        };
      }),
    );

    return commentsWithUserInfo;
  }

  async getCommentsCount(recipeId: string) {
    const recipeExists = await this.recipeRepository.exists(recipeId);
    if (!recipeExists) {
      throw new NotFoundException(`Recipe with ID ${recipeId} not found`);
    }
    return this.likeCommentRepository.getCommentsCount(recipeId);
  }

  async getComments(recipeId: string) {
    const recipeExists = await this.recipeRepository.exists(recipeId);
    if (!recipeExists) {
      throw new NotFoundException(`Recipe with ID ${recipeId} not found`);
    }
    return this.likeCommentRepository.getComments(recipeId);
  }

  async createLike(data: CreateLikeDto): Promise<LikeComment> {
    const recipeExists = await this.recipeRepository.exists(data.recipeId);
    if (!recipeExists) {
      throw new NotFoundException(`Recipe with ID ${data.recipeId} not found`);
    }

    const userExists = await this.userRepository.exists(data.userId);
    if (!userExists) {
      throw new NotFoundException(`User with ID ${data.userId} not found`);
    }

    return this.likeCommentRepository.createLike(data);
  }

  async removeLike(data: CreateLikeDto): Promise<LikeComment> {
    const recipeExists = await this.recipeRepository.exists(data.recipeId);
    if (!recipeExists) {
      throw new NotFoundException(`Recipe with ID ${data.recipeId} not found`);
    }

    const userExists = await this.userRepository.exists(data.userId);
    if (!userExists) {
      throw new NotFoundException(`User with ID ${data.userId} not found`);
    }

    return this.likeCommentRepository.removeLike(data);
  }

  async createComment(data: CreateCommentDto): Promise<LikeComment> {
    const recipeExists = await this.recipeRepository.exists(data.recipeId);
    if (!recipeExists) {
      throw new NotFoundException(`Recipe with ID ${data.recipeId} not found`);
    }

    const userExists = await this.userRepository.exists(data.userId);
    if (!userExists) {
      throw new NotFoundException(`User with ID ${data.userId} not found`);
    }

    return this.likeCommentRepository.createComment(data);
  }
}
