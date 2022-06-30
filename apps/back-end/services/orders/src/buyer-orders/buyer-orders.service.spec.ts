import { Test, TestingModule } from '@nestjs/testing';
import { BuyerOrdersService } from './buyer-orders.service';

describe('BuyerOrdersService', () => {
  let service: BuyerOrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BuyerOrdersService],
    }).compile();

    service = module.get<BuyerOrdersService>(BuyerOrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
