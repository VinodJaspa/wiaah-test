import { Module } from '@nestjs/common';
import { ServiceFiltersService } from './service-filters.service';
import { ServiceFiltersResolver } from './service-filters.resolver';

@Module({
  providers: [ServiceFiltersResolver, ServiceFiltersService],
})
export class ServiceFiltersModule {}
