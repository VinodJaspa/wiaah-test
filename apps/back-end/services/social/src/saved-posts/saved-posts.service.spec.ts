import { Test, TestingModule } from '@nestjs/testing';
import { SavedPostsService } from './saved-posts.service';

describe('SavedPostsService', () => {
  let service: SavedPostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SavedPostsService],
    }).compile();

    service = module.get<SavedPostsService>(SavedPostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
