import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../entity/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async findUserById(id: string): Promise<User> {
    return this.userModel.findOne({ uuid: id }).lean();
  }

  async createUser(data: User): Promise<User> {
    return this.userModel.create(data);
  }
}
