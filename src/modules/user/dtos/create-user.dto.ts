import { Exclude } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateUserRequestDTO {
  @IsString()
  name: string;
}

export class CreateUserResponseDTO {
  @Exclude()
  _id?: string;

  uuid: string;
  name: string;
}
