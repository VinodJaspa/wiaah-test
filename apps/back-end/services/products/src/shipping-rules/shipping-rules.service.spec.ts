import { Test, TestingModule } from '@nestjs/testing';
import { ShippingRulesService } from './shipping-rules.service';

describe('ShippingRulesService', () => {
  let service: ShippingRulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShippingRulesService],
    }).compile();

    service = module.get<ShippingRulesService>(ShippingRulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
