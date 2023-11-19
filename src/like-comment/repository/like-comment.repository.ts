import { Injectable } from '@nestjs/common';
import { Comment, LikeComment } from '../entities/like-comment.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CreateLikeDto } from '../dto/create-like.dto';

@Injectable()
export class LikeCommentRepository {
  constructor(
    @InjectModel('LikeComment')
    private readonly likeCommentModel: Model<LikeComment>,
  ) {}

  async getLikeCount(recipeId: string): Promise<Number> {
    return await this.likeCommentModel.count({ recipeId: recipeId });
  }

  async getComments(recipeId: string): Promise<LikeComment> {
    return await this.likeCommentModel.findOne({ recipeId: recipeId });
  }

  async createLike(data: CreateLikeDto): Promise<LikeComment> {
    return await this.likeCommentModel.findOneAndUpdate(
      { recipeId: data.recipeId },
      {
        $addToSet: { likes: data.userId },
      },
      { new: true, upsert: true },
    );
  }

  async removeLike(data: CreateLikeDto): Promise<LikeComment> {
    return await this.likeCommentModel.findOneAndUpdate(
      { recipeId: data.recipeId },
      { $pull: { likes: data.userId } },
      { new: true },
    );
  }

  async createComment(data: CreateCommentDto): Promise<LikeComment> {
    const comment: Comment = {
      user: data.userId,
      comment: data.comment,
    };

    const result = await this.likeCommentModel.findOneAndUpdate(
      { recipeId: data.recipeId },
      {
        $push: { comments: comment },
      },
      { new: true, upsert: true },
    );

    console.log('Update result:', result);
    return result;
  }
}
