import { Module } from '@nestjs/common';
import { FilterService } from './filter.service';
import { FilterResolver } from './filter.resolver';
import { PrismaService } from 'prismaService';

@Module({
  providers: [FilterResolver, FilterService, PrismaService],
})
export class FilterModule {}
