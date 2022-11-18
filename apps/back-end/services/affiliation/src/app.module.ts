import { Global, Module } from '@nestjs/common';
import { AffiliationModule } from '@affiliation/affiliation.module';
import { PrismaService } from 'prismaService';
import { AffiliationHistoryModule } from '@affiliation-history/affiliation-history.module';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
  imports: [AffiliationHistoryModule],
})
export class GlobalPrisma {}

@Module({
  imports: [AffiliationModule, GlobalPrisma],
})
export class AppModule {}
