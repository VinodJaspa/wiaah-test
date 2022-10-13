import { Test, TestingModule } from '@nestjs/testing';
import { ShippingDetailsResolver } from './shipping-details.resolver';
import { ShippingDetailsService } from './shipping-details.service';

describe('ShippingDetailsResolver', () => {
  let resolver: ShippingDetailsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShippingDetailsResolver, ShippingDetailsService],
    }).compile();

    resolver = module.get<ShippingDetailsResolver>(ShippingDetailsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
