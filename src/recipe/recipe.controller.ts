import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe } from './entities/recipe.entity';
import { FindRecipeDTO } from './dto/find-recipe.dto';
import { EmailAuthGuard } from 'src/email-auth/email-auth.guard';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  // @UseGuards(EmailAuthGuard)
  create(@Body() data: CreateRecipeDto | CreateRecipeDto[]) {
    if (Array.isArray(data)) {
      // Handle array of CreateRecipeDto objects
      return this.recipeService.createMany(data);
    } else {
      // Handle single CreateRecipeDto object
      return this.recipeService.create(data);
    }
  }

  @Get()
  // @UseGuards(EmailAuthGuard)
  async findRecipe(@Query() findRecipeDTO: FindRecipeDTO) {
    return await this.recipeService.findRecipe(findRecipeDTO);
  }

  @Delete(':id')
  // @UseGuards(EmailAuthGuard)
  remove(@Param('id') id: string) {
    return this.recipeService.remove(+id);
  }
}
