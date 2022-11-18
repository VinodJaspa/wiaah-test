import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AffiliationHistoryResolver } from './affiliation-history.resolver';
import { AffiliationPurchaseController } from './affiliation-purchase.controller';

@Module({
  imports: [CqrsModule],
  providers: [AffiliationHistoryResolver],
  controllers: [AffiliationPurchaseController],
})
export class AffiliationHistoryModule {}
