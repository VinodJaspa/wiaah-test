import { Test, TestingModule } from '@nestjs/testing';
import { OrdersClusterController } from './orders-cluster.controller';

describe('OrdersClusterController', () => {
  let controller: OrdersClusterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersClusterController],
    }).compile();

    controller = module.get<OrdersClusterController>(OrdersClusterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
