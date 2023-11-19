import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/users/repository/users.repository';
import { FollowersFollowingRepository } from './repository/followers-following.repository';

@Injectable()
export class FollowersFollowingService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly followersFollowingRepository: FollowersFollowingRepository,
  ) {}
  async getFollowers(userId: string) {
    if (!(await this.userRepository.exists(userId))) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return this.followersFollowingRepository.getFollowers(userId);
  }

  async getFollowing(userId: string) {
    if (!(await this.userRepository.exists(userId))) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return this.followersFollowingRepository.getFollowing(userId);
  }

  async follow(followerId: string, followingId: string) {
    const followerExists = await this.userRepository.exists(followerId);
    const followingExists = await this.userRepository.exists(followingId);

    if (!followerExists || !followingExists) {
      throw new NotFoundException('One or both users not found');
    }
    return this.followersFollowingRepository.follow(followerId, followingId);
  }

  async unfollow(followerId: string, followingId: string) {
    const followerExists = await this.userRepository.exists(followerId);
    const followingExists = await this.userRepository.exists(followingId);

    if (!followerExists || !followingExists) {
      throw new NotFoundException('One or both users not found');
    }
    return this.followersFollowingRepository.unfollow(followerId, followingId);
  }
}
