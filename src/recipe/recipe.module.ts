import { Module, forwardRef } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipeSchema } from './entities/recipe.entity';
import { RecipeRepository } from './repository/recipe.repository';
import { UsersModule } from 'src/users/users.module';
import { LikeCommentModule } from 'src/like-comment/like-comment.module';
import { FollowersFollowingModule } from 'src/followers-following/followers-following.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Recipes', schema: RecipeSchema }]),
    UsersModule,
    LikeCommentModule,
    FollowersFollowingModule,
  ],
  controllers: [RecipeController],
  providers: [RecipeService, RecipeRepository],
  exports: [RecipeRepository],
})
export class RecipeModule {}
