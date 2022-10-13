import { Test, TestingModule } from '@nestjs/testing';
import { FilterResolver } from './filter.resolver';
import { FilterService } from './filter.service';

describe('FilterResolver', () => {
  let resolver: FilterResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilterResolver, FilterService],
    }).compile();

    resolver = module.get<FilterResolver>(FilterResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
