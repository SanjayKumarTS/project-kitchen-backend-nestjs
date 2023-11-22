import { IsString } from 'class-validator';

export class FindRecipeDTO {
  authorId: string;
  name: string;
  uuid: string;
  page: string;
}
