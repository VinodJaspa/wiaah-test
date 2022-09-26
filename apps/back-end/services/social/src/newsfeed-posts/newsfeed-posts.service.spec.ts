import { Test, TestingModule } from '@nestjs/testing';
import { NewsfeedPostsService } from './newsfeed-posts.service';

describe('NewsfeedPostsService', () => {
  let service: NewsfeedPostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewsfeedPostsService],
    }).compile();

    service = module.get<NewsfeedPostsService>(NewsfeedPostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
