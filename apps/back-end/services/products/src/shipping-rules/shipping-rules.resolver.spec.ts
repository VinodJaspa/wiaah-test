import { Test, TestingModule } from '@nestjs/testing';
import { ShippingRulesResolver } from './shipping-rules.resolver';
import { ShippingRulesService } from './shipping-rules.service';

describe('ShippingRulesResolver', () => {
  let resolver: ShippingRulesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShippingRulesResolver, ShippingRulesService],
    }).compile();

    resolver = module.get<ShippingRulesResolver>(ShippingRulesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
