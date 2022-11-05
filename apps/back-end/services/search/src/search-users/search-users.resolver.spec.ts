import { Test, TestingModule } from '@nestjs/testing';
import { SearchUsersResolver } from './search-users.resolver';
import { SearchUsersService } from './search-users.service';

describe('SearchUsersResolver', () => {
  let resolver: SearchUsersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SearchUsersResolver, SearchUsersService],
    }).compile();

    resolver = module.get<SearchUsersResolver>(SearchUsersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
