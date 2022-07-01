import { Test, TestingModule } from '@nestjs/testing';
import { OrdersClusterService } from './orders-cluster.service';

describe('OrdersClusterService', () => {
  let service: OrdersClusterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersClusterService],
    }).compile();

    service = module.get<OrdersClusterService>(OrdersClusterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
