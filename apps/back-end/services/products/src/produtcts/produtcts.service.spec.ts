import { Test, TestingModule } from '@nestjs/testing';
import { ProdutctsService } from './produtcts.service';

describe('ProdutctsService', () => {
  let service: ProdutctsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProdutctsService],
    }).compile();

    service = module.get<ProdutctsService>(ProdutctsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
