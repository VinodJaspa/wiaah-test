import { Test, TestingModule } from '@nestjs/testing';
import { SellerOrdersResolver } from './seller-orders.resolver';
import { SellerOrdersService } from './seller-orders.service';

describe('SellerOrdersResolver', () => {
  let resolver: SellerOrdersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SellerOrdersResolver, SellerOrdersService],
    }).compile();

    resolver = module.get<SellerOrdersResolver>(SellerOrdersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
