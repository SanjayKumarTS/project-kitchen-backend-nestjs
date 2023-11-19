import { Module } from '@nestjs/common';
import { FollowersFollowingService } from './followers-following.service';
import { FollowersFollowingController } from './followers-following.controller';
import { UsersModule } from 'src/users/users.module';
import { FollowersFollowingRepository } from './repository/followers-following.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { FollowersFollowingSchema } from './entities/followers-following.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'FollowersFollowing', schema: FollowersFollowingSchema },
    ]),
    UsersModule,
  ],
  controllers: [FollowersFollowingController],
  providers: [FollowersFollowingService, FollowersFollowingRepository],
})
export class FollowersFollowingModule {}
