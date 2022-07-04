import { Test, TestingModule } from '@nestjs/testing';
import { VouchersManagementController } from './vouchers-management.controller';

describe('VouchersManagementController', () => {
  let controller: VouchersManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VouchersManagementController],
    }).compile();

    controller = module.get<VouchersManagementController>(
      VouchersManagementController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
