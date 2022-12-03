import { Test, TestingModule } from '@nestjs/testing';
import { SavedPostsResolver } from './saved-posts.resolver';
import { SavedPostsService } from './saved-posts.service';

describe('SavedPostsResolver', () => {
  let resolver: SavedPostsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SavedPostsResolver, SavedPostsService],
    }).compile();

    resolver = module.get<SavedPostsResolver>(SavedPostsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
