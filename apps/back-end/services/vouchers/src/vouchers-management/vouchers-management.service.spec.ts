import { Test, TestingModule } from '@nestjs/testing';
import { VouchersManagementService } from './vouchers-management.service';

describe('VouchersManagementService', () => {
  let service: VouchersManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VouchersManagementService],
    }).compile();

    service = module.get<VouchersManagementService>(VouchersManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
