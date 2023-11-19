import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsArray, IsString, isString } from 'class-validator';

export class CreateUserRequestDto {
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

export class CreateUserResponseDTO {
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
