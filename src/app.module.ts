import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RecipeModule } from './recipe/recipe.module';
import { LikeCommentModule } from './like-comment/like-comment.module';
import { FollowersFollowingModule } from './followers-following/followers-following.module';
import { GenerativeAiModule } from './generative-ai/generative-ai.module';

import * as dotenv from 'dotenv';

dotenv.config();
const db_connection = process.env.DB_CONNECTION;
mongoose.set('debug', true);
@Module({
  imports: [
    UsersModule,
    RecipeModule,
    MongooseModule.forRoot(`${db_connection}`),
    LikeCommentModule,
    FollowersFollowingModule,
    GenerativeAiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
