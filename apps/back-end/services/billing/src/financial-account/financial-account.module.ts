import { Module } from '@nestjs/common';
import { PrismaService } from 'prismaService';
import { FinancialAccountResolver } from './financial-account.resolver';

@Module({
  providers: [FinancialAccountResolver, PrismaService],
})
export class FinancialAccountModule {}
