import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FollowersFollowingService } from './followers-following.service';

@Controller('followers-following')
export class FollowersFollowingController {
  constructor(
    private readonly followersFollowingService: FollowersFollowingService,
  ) {}

  @Get('followers/:userId')
  async getFollowers(@Param('userId') userId: string) {
    return this.followersFollowingService.getFollowers(userId);
  }

  @Get('following/:userId')
  async getFollowing(@Param('userId') userId: string) {
    return this.followersFollowingService.getFollowing(userId);
  }

  @Post(':userId/follow/:targetUserId')
  async follow(
    @Param('userId') followerId: string,
    @Param('targetUserId') followingId: string,
  ) {
    return this.followersFollowingService.follow(followerId, followingId);
  }

  @Delete(':userId/unfollow/:targetUserId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async unfollow(
    @Param('userId') followerId: string,
    @Param('targetUserId') followingId: string,
  ) {
    await this.followersFollowingService.unfollow(followerId, followingId);
    return;
  }
}
