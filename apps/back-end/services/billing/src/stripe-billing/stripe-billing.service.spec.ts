import { Test, TestingModule } from '@nestjs/testing';
import { StripeBillingService } from './stripe-billing.service';

describe('StripeBillingService', () => {
  let service: StripeBillingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StripeBillingService],
    }).compile();

    service = module.get<StripeBillingService>(StripeBillingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
