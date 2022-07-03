import { Resolver } from '@nestjs/graphql';
import { VouchersManagementService } from './vouchers-management.service';
import { VoucherCluster } from '@entities';

@Resolver(() => VoucherCluster)
export class VouchersManagementResolver {
  constructor(
    private readonly vouchersManagementService: VouchersManagementService,
  ) {}
}
