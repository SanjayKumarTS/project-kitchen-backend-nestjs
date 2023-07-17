import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  CreateUserRequestDTO,
  CreateUserResponseDTO,
} from './dtos/create-user.dto';
import { GetUserRequestDTO, GetUserResponseDTO } from './dtos/get-user.dto';
import { UserService } from './user.service';

@Controller('user')
@UsePipes(new ValidationPipe())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findUser(
    @Param() params: GetUserRequestDTO,
  ): Promise<GetUserResponseDTO> {
    return this.userService.findUserById(params.id);
  }

  @Post()
  async createUser(
    @Body() body: CreateUserRequestDTO,
  ): Promise<CreateUserResponseDTO> {
    return this.userService.createUser(body);
  }
}
