import { Test, TestingModule } from '@nestjs/testing';
import { WisherslistResolver } from './wisherslist.resolver';
import { WisherslistService } from './wisherslist.service';

describe('WisherslistResolver', () => {
  let resolver: WisherslistResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WisherslistResolver, WisherslistService],
    }).compile();

    resolver = module.get<WisherslistResolver>(WisherslistResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
