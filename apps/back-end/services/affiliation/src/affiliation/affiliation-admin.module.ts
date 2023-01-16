import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AffiliationAdminResolver } from './affiliation-admin.resolver';

@Module({
  imports: [CqrsModule],
  providers: [AffiliationAdminResolver],
})
export class AffiliationAdminModule {}
