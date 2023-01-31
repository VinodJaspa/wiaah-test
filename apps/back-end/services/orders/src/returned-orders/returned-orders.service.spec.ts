import { Test, TestingModule } from '@nestjs/testing';
import { ReturnedOrdersService } from './returned-orders.service';

describe('ReturnedOrdersService', () => {
  let service: ReturnedOrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReturnedOrdersService],
    }).compile();

    service = module.get<ReturnedOrdersService>(ReturnedOrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
