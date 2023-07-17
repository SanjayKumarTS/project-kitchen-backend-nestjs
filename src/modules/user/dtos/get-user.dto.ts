import { Exclude } from 'class-transformer';
import { IsString } from 'class-validator';

export class GetUserRequestDTO {
  @IsString()
  id: string;
}
export class GetUserResponseDTO {
  @Exclude()
  _id?: string;

  uuid: string;
  name: string;
}
