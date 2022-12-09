import { Module } from '@nestjs/common';
import { AffiliationAdminResolver } from './affiliation-admin.resolver';

@Module({
  providers: [AffiliationAdminResolver],
})
export class AffiliationAdminModule {}
