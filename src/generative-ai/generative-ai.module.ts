import { Module } from '@nestjs/common';
import { GenerativeAiService } from './generative-ai.service';
import { GenerativeAiController } from './generative-ai.controller';

@Module({
  controllers: [GenerativeAiController],
  providers: [GenerativeAiService]
})
export class GenerativeAiModule {}
