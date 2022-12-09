import { Module } from '@nestjs/common';
import { AffiliationHistoryAdminResolver } from './affiliation-history-admin.resolver';

@Module({
  providers: [AffiliationHistoryAdminResolver],
})
export class AffiliationHistoryAdminModule {}
