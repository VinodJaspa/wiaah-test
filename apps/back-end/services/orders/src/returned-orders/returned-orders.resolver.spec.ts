import { Test, TestingModule } from '@nestjs/testing';
import { ReturnedOrdersResolver } from './returned-orders.resolver';
import { ReturnedOrdersService } from './returned-orders.service';

describe('ReturnedOrdersResolver', () => {
  let resolver: ReturnedOrdersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReturnedOrdersResolver, ReturnedOrdersService],
    }).compile();

    resolver = module.get<ReturnedOrdersResolver>(ReturnedOrdersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
