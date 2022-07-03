import { Test, TestingModule } from '@nestjs/testing';
import { BuyerOrdersResolver } from './buyer-orders.resolver';
import { BuyerOrdersService } from './buyer-orders.service';

describe('BuyerOrdersResolver', () => {
  let resolver: BuyerOrdersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BuyerOrdersResolver, BuyerOrdersService],
    }).compile();

    resolver = module.get<BuyerOrdersResolver>(BuyerOrdersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
