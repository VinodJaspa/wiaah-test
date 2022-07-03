import { Test, TestingModule } from '@nestjs/testing';
import { VouchersManagementResolver } from './vouchers-management.resolver';
import { VouchersManagementService } from './vouchers-management.service';

describe('VouchersManagementResolver', () => {
  let resolver: VouchersManagementResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VouchersManagementResolver, VouchersManagementService],
    }).compile();

    resolver = module.get<VouchersManagementResolver>(
      VouchersManagementResolver,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
