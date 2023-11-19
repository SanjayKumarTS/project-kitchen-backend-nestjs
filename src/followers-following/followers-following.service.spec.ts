import { Test, TestingModule } from '@nestjs/testing';
import { FollowersFollowingService } from './followers-following.service';

describe('FollowersFollowingService', () => {
  let service: FollowersFollowingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FollowersFollowingService],
    }).compile();

    service = module.get<FollowersFollowingService>(FollowersFollowingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
