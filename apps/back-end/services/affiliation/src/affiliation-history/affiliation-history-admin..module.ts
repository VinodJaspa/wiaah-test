import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AffiliationHistoryAdminResolver } from './affiliation-history-admin.resolver';

@Module({
  imports: [CqrsModule],
  providers: [AffiliationHistoryAdminResolver],
})
export class AffiliationHistoryAdminModule {}
