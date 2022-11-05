import { Test, TestingModule } from '@nestjs/testing';
import { SearchHashtagResolver } from './search-hashtag.resolver';
import { SearchHashtagService } from './search-hashtag.service';

describe('SearchHashtagResolver', () => {
  let resolver: SearchHashtagResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SearchHashtagResolver, SearchHashtagService],
    }).compile();

    resolver = module.get<SearchHashtagResolver>(SearchHashtagResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
