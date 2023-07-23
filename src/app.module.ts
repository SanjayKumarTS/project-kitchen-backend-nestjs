import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RecipeModule } from './recipe/recipe.module';

import * as dotenv from 'dotenv';

dotenv.config();
const db_connection = process.env.DB_CONNECTION;

@Module({
  imports: [
    UsersModule,
    RecipeModule,
    MongooseModule.forRoot(`${db_connection}`),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
