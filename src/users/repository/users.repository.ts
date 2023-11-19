import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../entities/user.entity';
import { Model } from 'mongoose';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(@InjectModel('Users') private readonly usersModel: Model<User>) {}

  async exists(id: string): Promise<Boolean> {
    const result = this.usersModel.exists({ uuid: id });
    return result ? true : false;
  }

  async create(data: User): Promise<User> {
    return await this.usersModel.create(data);
  }

  async findAll(): Promise<Array<User>> {
    return await this.usersModel.find().lean();
  }

  async findOne(id: string): Promise<User> {
    return await this.usersModel.findOne({ uuid: id }).lean();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.usersModel.findOneAndUpdate({ uuid: id }, updateUserDto);
  }

  async remove(id: string) {
    return await this.usersModel.findOneAndDelete({ uuid: id });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.usersModel.findOne({ email: email });
  }
}
