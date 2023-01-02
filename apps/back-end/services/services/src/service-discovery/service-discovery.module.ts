import { Module } from '@nestjs/common';
import { ServiceDiscoveryService } from './service-discovery.service';
import { ServiceDiscoveryResolver } from './service-discovery.resolver';
import { ServiceDiscoveryController } from './service-discovery.controller';

@Module({
  providers: [ServiceDiscoveryResolver, ServiceDiscoveryService],
  controllers: [ServiceDiscoveryController]
})
export class ServiceDiscoveryModule {}
