import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserRequestDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './repository/users.repository';
import { plainToInstance } from 'class-transformer';
import { FindUserDTO } from './dto/get-user.dto';
import { OAuth2Client } from 'google-auth-library';
import { CreateCommentDto } from 'src/like-comment/dto/create-comment.dto';
import { author } from './dto/author.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {
    this.googleOAuthClient = new OAuth2Client(this.googleOAuthConfig);
  }
  private readonly googleOAuthConfig = {
    clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  };

  private readonly googleOAuthClient: OAuth2Client;

  async create(createUserDto: CreateUserRequestDto): Promise<User> {
    return this.userRepository.create(plainToInstance(User, createUserDto));
  }

  private users = [];

  async checkAndAddUser(auth: { idToken: string }) {
    try {
      const ticket = await this.googleOAuthClient.verifyIdToken({
        idToken: auth.idToken,
        audience: this.googleOAuthConfig.clientId,
      });

      const payload = ticket.getPayload();

      let user = await this.userRepository.findUser({ email: payload.email });

      if (!user) {
        let newUser = new CreateUserRequestDto();
        newUser.email = payload.email;
        newUser.name = payload.name;
        newUser.photoURL = payload.picture;

        return await this.userRepository.create(plainToInstance(User, newUser));
      } else {
        return user;
      }
    } catch (error) {
      // Handle error (e.g., token is invalid)
      throw new UnauthorizedException('Invalid token');
    }
  }

  async findUsers(findUserDTO: FindUserDTO) {
    const users = await this.userRepository.findManyUsers(findUserDTO);
    let authors: author[] = [];
    if (users) {
      authors = users.map((user) => {
        return {
          name: user.name,
          photo: user.photoURL,
          uuid: user.uuid,
          bio: user.bio,
        };
      });
    }
    return authors;
  }

  async findUser(findUserDTO: FindUserDTO) {
    this.userRepository.findUser(findUserDTO);
  }

  async userExists(findUserDTO: FindUserDTO) {
    this.userRepository.userExists(findUserDTO);
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
