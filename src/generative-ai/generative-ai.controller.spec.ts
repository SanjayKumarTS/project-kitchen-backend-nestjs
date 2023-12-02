import { Test, TestingModule } from '@nestjs/testing';
import { GenerativeAiController } from './generative-ai.controller';
import { GenerativeAiService } from './generative-ai.service';

describe('GenerativeAiController', () => {
  let controller: GenerativeAiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenerativeAiController],
      providers: [GenerativeAiService],
    }).compile();

    controller = module.get<GenerativeAiController>(GenerativeAiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
