import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserRequestDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './repository/users.repository';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  private users = [];

  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserRequestDto): Promise<User> {
    return this.userRepository.create(plainToInstance(User, createUserDto));
  }

  async findAll(): Promise<Array<User>> {
    return this.userRepository.findAll();
  }

  async findOne(id: string): Promise<User> {
    const user = this.userRepository.findOne(id);
    if (!user) {
      throw new Error('User Not Found!');
    }

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findByEmail(email);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    const userRemoved = this.userRepository.remove(id);
    if (!userRemoved) {
      throw new Error('User Not Found!');
    }
    return userRemoved;
  }
}
