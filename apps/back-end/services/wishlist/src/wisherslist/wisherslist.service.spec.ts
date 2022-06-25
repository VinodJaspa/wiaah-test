import { Test, TestingModule } from '@nestjs/testing';
import { WisherslistService } from './wisherslist.service';

describe('WisherslistService', () => {
  let service: WisherslistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WisherslistService],
    }).compile();

    service = module.get<WisherslistService>(WisherslistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
