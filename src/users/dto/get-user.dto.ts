import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
  isString,
} from 'class-validator';

export class GetUserRequestDTO {
  @IsString()
  uuid: string;
}

export class GetUserResponseDTO {
  @Exclude()
  _id?: string;
  @Exclude()
  uuid: string;
  @IsString()
  name: string;
  @IsString()
  email: string;
  @IsString()
  photoURL: string;
  @IsArray()
  @IsString({ each: true })
  tags: string[];
  @IsArray()
  @IsString({ each: true })
  favorites: string[];
  @IsString()
  bio: string;
}

export class FindUserDTO {
  @IsString()
  @IsOptional()
  uuid?: string;
  @IsString()
  @IsOptional()
  name?: string;
  @IsString()
  @IsOptional()
  email?: string;
}
