import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsArray, IsString, isString } from 'class-validator';

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
}
