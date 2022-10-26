import { Module } from '@nestjs/common';
import { ServicesSearchEngineResolver } from './services-search-engine.resolver';
import { PrismaService } from 'prismaService';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  providers: [ServicesSearchEngineResolver, PrismaService],
})
export class ServicesSearchEngineModule {}
