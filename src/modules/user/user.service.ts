import { Injectable, NotFoundException } from '@nestjs/common';
import { classToClassFromExist, plainToInstance } from 'class-transformer';
import { CreateUserRequestDTO } from './dtos/create-user.dto';
import { User } from './entity/user.entity';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findUserById(id: string): Promise<User> {
    const user = await this.userRepository.findUserById(id);

    if (!user) throw new NotFoundException('User not found!');

    return user;
  }

  async createUser(data: CreateUserRequestDTO): Promise<User> {
    return this.userRepository.createUser(plainToInstance(User, data));
  }
}
