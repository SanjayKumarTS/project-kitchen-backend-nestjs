import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class FindRecipesForUserDTO {
  @IsString()
  @IsNotEmpty()
  uuid: string;

  @IsNumber()
  @IsOptional()
  @Min(1)
  page: number = 1;

  @IsNumber()
  @IsOptional()
  @Min(1)
  pageSize: number = 10;
}
