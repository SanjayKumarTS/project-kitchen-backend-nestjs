import { Test, TestingModule } from '@nestjs/testing';
import { FollowersFollowingController } from './followers-following.controller';
import { FollowersFollowingService } from './followers-following.service';

describe('FollowersFollowingController', () => {
  let controller: FollowersFollowingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FollowersFollowingController],
      providers: [FollowersFollowingService],
    }).compile();

    controller = module.get<FollowersFollowingController>(FollowersFollowingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
