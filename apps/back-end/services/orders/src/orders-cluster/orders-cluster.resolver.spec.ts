import { Test, TestingModule } from '@nestjs/testing';
import { OrdersClusterResolver } from './orders-cluster.resolver';
import { OrdersClusterService } from './orders-cluster.service';

describe('OrdersClusterResolver', () => {
  let resolver: OrdersClusterResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersClusterResolver, OrdersClusterService],
    }).compile();

    resolver = module.get<OrdersClusterResolver>(OrdersClusterResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
