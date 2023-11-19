import { Module } from '@nestjs/common';
import { LikeCommentService } from './like-comment.service';
import { LikeCommentController } from './like-comment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LikeComment, LikeCommentSchema } from './entities/like-comment.entity';
import { UsersModule } from 'src/users/users.module';
import { RecipeModule } from 'src/recipe/recipe.module';
import { LikeCommentRepository } from './repository/like-comment.repository';
import { UserRepository } from 'src/users/repository/users.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'LikeComment', schema: LikeCommentSchema },
    ]),
    UsersModule,
    RecipeModule,
  ],
  controllers: [LikeCommentController],
  providers: [LikeCommentService, LikeCommentRepository],
})
export class LikeCommentModule {}
