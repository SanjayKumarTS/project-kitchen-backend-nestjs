import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GenerativeAiService } from './generative-ai.service';
import { CreateGenerativeAiDto } from './dto/create-generative-ai.dto';
import { UpdateGenerativeAiDto } from './dto/update-generative-ai.dto';

@Controller('generative-ai')
export class GenerativeAiController {
  constructor(private readonly generativeAiService: GenerativeAiService) {}

  @Post()
  assistWithDescription(@Body('data') data: string) {
    return this.generativeAiService.assistWithDescription(data);
  }
}
