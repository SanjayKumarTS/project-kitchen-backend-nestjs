import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FollowersFollowing } from '../entities/followers-following.entity';
import { Model } from 'mongoose';

Injectable();
export class FollowersFollowingRepository {
  constructor(
    @InjectModel('FollowersFollowing')
    private readonly followersFollowingModel: Model<FollowersFollowing>,
  ) {}

  // In FollowersFollowingRepository

  async isFollowing(followerId: string, followingId: string): Promise<boolean> {
    const count = await this.followersFollowingModel.countDocuments({
      followerId,
      followingId,
    });
    return count > 0;
  }

  async getFollowers(userId: string) {
    return await this.followersFollowingModel.find({ followingId: userId });
  }
  async getFollowing(userId: string) {
    return await this.followersFollowingModel.find({ followerId: userId });
  }
  async follow(followerId: string, followingId: string) {
    const follow = new this.followersFollowingModel({
      followerId,
      followingId,
    });
    return await follow.save();
  }
  async unfollow(followerId: string, followingId: string) {
    return await this.followersFollowingModel.deleteOne({
      followerId,
      followingId,
    });
  }
}
