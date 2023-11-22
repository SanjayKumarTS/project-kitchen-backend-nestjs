import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  CreateUserRequestDto,
  CreateUserResponseDTO,
} from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { EmailAuthGuard } from 'src/email-auth/email-auth.guard';
import { FindUserDTO } from './dto/get-user.dto';

@Controller('users')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserRequestDto,
  ): Promise<CreateUserResponseDTO> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  // @UseGuards(EmailAuthGuard)
  async findUser(@Query() findUserDTO: FindUserDTO) {
    return await this.usersService.findUser(findUserDTO);
  }

  @Post('googleSignIn')
  async checkAndAddUser(@Body() auth: { idToken: string }) {
    return await this.usersService.checkAndAddUser(auth);
  }

  async userExists(@Query() findUserDTO: FindUserDTO) {
    return await this.usersService.userExists(findUserDTO);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   try {
  //     return this.usersService.findOne(id);
  //   } catch (err) {
  //     throw new NotFoundException();
  //   }
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.usersService.remove(id);
    } catch (err) {
      throw new NotFoundException();
    }
  }
}
