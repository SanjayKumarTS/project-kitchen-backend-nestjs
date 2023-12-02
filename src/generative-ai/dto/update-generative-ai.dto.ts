import { PartialType } from '@nestjs/swagger';
import { CreateGenerativeAiDto } from './create-generative-ai.dto';

export class UpdateGenerativeAiDto extends PartialType(CreateGenerativeAiDto) {}
