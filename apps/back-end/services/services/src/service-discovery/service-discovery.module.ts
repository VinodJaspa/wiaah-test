import { Module } from '@nestjs/common';
import { ServiceDiscoveryService } from './service-discovery.service';
import { ServiceDiscoveryResolver } from './service-discovery.resolver';

@Module({
  providers: [ServiceDiscoveryResolver, ServiceDiscoveryService]
})
export class ServiceDiscoveryModule {}
