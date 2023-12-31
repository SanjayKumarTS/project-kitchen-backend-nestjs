import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserSchema } from './entities/user.entity';
import { UserRepository } from './repository/users.repository';
import { EmailAuthGuard } from 'src/email-auth/email-auth.guard';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UserRepository, UsersService, EmailAuthGuard],
  exports: [UsersService, UserRepository],
})
export class UsersModule {}
