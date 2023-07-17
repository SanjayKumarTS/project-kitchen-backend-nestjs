import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as dotenv from 'dotenv';
import { UserModule } from './modules/user/user.module';

dotenv.config();
const username = process.env.USERNAME;
const password = process.env.PASSWORD;

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${username}:${password}@projectycluster0.r1yi37s.mongodb.net/?retryWrites=true&w=majority`,
    ),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
