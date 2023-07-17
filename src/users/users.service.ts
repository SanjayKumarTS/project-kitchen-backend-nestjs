import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  private users = [];

  constructor(
    @InjectModel('Users') private readonly usersModel: Model<CreateUserDto>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = new this.usersModel({
      uuid: uuidv4(),
      ...createUserDto,
    });
    const result = await newUser.save();
    return result;
  }

  async findAll() {
    const users = await this.usersModel.find();
    return users as CreateUserDto[];
  }

  async findOne(id: string) {
    const user = await this.usersModel.findOne({ uuid: id });
    if (!user) {
      throw new Error('User Not Found!');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const result = await this.usersModel.findOneAndUpdate(
      { uuid: id },
      updateUserDto,
    );
    const user = await this.findOne(id);
    return user;
  }

  async remove(id: string) {
    const userRemoved = await this.usersModel.findOneAndDelete({ uuid: id });
    if (!userRemoved) {
      throw new Error('User Not Found!');
    }
    return userRemoved;
  }
}
