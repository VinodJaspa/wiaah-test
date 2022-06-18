import { Test, TestingModule } from '@nestjs/testing';
import { ProdutctsResolver } from './produtcts.resolver';
import { ProdutctsService } from './produtcts.service';

describe('ProdutctsResolver', () => {
  let resolver: ProdutctsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProdutctsResolver, ProdutctsService],
    }).compile();

    resolver = module.get<ProdutctsResolver>(ProdutctsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
