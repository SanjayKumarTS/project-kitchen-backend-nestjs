import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/users/repository/users.repository';
import { FollowersFollowingRepository } from './repository/followers-following.repository';

@Injectable()
export class FollowersFollowingService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly followersFollowingRepository: FollowersFollowingRepository,
  ) {}

  async getFollowersAndFollowing(uuid: string) {
    const userExists = await this.userRepository.exists(uuid);
    if (!userExists) {
      throw new NotFoundException(`User with ID ${uuid} not found`);
    }

    const followersDocs = await this.followersFollowingRepository.getFollowers(
      uuid,
    );
    const followingDocs = await this.followersFollowingRepository.getFollowing(
      uuid,
    );

    const followers = await Promise.all(
      followersDocs.map(async (doc) => {
        const user = await this.userRepository.findOne(doc.followerId);
        return {
          name: user.name,
          photo: user.photoURL,
          uuid: user.uuid,
          bio: user.bio,
        };
      }),
    );
    const following = await Promise.all(
      followingDocs.map(async (doc) => {
        const user = await this.userRepository.findOne(doc.followingId);
        return {
          name: user.name,
          photo: user.photoURL,
          uuid: user.uuid,
          bio: user.bio,
        };
      }),
    );

    return {
      followers: followers,
      following: following,
    };
  }

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
    // Check if both users exist
    const followerExists = await this.userRepository.exists(followerId);
    const followingExists = await this.userRepository.exists(followingId);

    if (!followerExists || !followingExists) {
      throw new NotFoundException('One or both users not found');
    }

    // Check if already following
    const alreadyFollowing =
      await this.followersFollowingRepository.isFollowing(
        followerId,
        followingId,
      );
    if (!alreadyFollowing) {
      return this.followersFollowingRepository.follow(followerId, followingId);
    } else {
      throw new NotFoundException('Already following');
    }
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
