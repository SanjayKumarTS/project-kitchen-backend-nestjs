import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { LikeCommentService } from './like-comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateLikeDto } from './dto/create-like.dto';
import { error } from 'console';

@Controller('like-comment')
export class LikeCommentController {
  constructor(private readonly likeCommentService: LikeCommentService) {}

  @Get('like/:recipeId')
  async getLikesCount(@Param('recipeId') recipeId: string) {
    try {
      return await this.likeCommentService.getLikeCount(recipeId);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get('comment/:recipeId')
  async getComments(@Param('recipeId') recipeId: string) {
    try {
      return await this.likeCommentService.getComments(recipeId);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get('comments/:recipeId')
  async getCommentsWithUserInfo(@Param('recipeId') recipeId: string) {
    try {
      return await this.likeCommentService.getCommentsWithUserInfo(recipeId);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Post('like')
  async createLike(@Body() createLikeDto: CreateLikeDto) {
    try {
      return await this.likeCommentService.createLike(createLikeDto);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Delete('like')
  async removeLike(@Body() createLikeDto: CreateLikeDto) {
    try {
      return await this.likeCommentService.removeLike(createLikeDto);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Post('comment')
  async createComment(@Body() createCommentDto: CreateCommentDto) {
    try {
      return await this.likeCommentService.createComment(createCommentDto);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get('liked/:recipeId')
  async getLikes(@Param('recipeId') recipeId: string) {
    try {
      return await this.likeCommentService.getLike(recipeId);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get('likes')
  async getAllLikes() {
    try {
      return await this.likeCommentService.getAllLikes();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
