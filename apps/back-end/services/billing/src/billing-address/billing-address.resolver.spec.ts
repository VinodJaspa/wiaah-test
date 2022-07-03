import { Test, TestingModule } from '@nestjs/testing';
import { BillingAddressResolver } from './billing-address.resolver';
import { BillingAddressService } from './billing-address.service';

describe('BillingAddressResolver', () => {
  let resolver: BillingAddressResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BillingAddressResolver, BillingAddressService],
    }).compile();

    resolver = module.get<BillingAddressResolver>(BillingAddressResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
