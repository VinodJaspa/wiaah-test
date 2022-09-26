import { Test, TestingModule } from '@nestjs/testing';
import { NewsfeedPostsResolver } from './newsfeed-posts.resolver';
import { NewsfeedPostsService } from './newsfeed-posts.service';

describe('NewsfeedPostsResolver', () => {
  let resolver: NewsfeedPostsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewsfeedPostsResolver, NewsfeedPostsService],
    }).compile();

    resolver = module.get<NewsfeedPostsResolver>(NewsfeedPostsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
