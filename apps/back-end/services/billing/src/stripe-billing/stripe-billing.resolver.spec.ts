import { Test, TestingModule } from '@nestjs/testing';
import { StripeBillingResolver } from './stripe-billing.resolver';
import { StripeBillingService } from './stripe-billing.service';

describe('StripeBillingResolver', () => {
  let resolver: StripeBillingResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StripeBillingResolver, StripeBillingService],
    }).compile();

    resolver = module.get<StripeBillingResolver>(StripeBillingResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
