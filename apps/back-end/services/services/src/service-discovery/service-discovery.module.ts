import { Module } from '@nestjs/common';
import { ServiceDiscoveryResolver } from './service-discovery.resolver';
import { ServiceDiscoveryController } from './service-discovery.controller';

@Module({
  providers: [ServiceDiscoveryResolver],
  controllers: [ServiceDiscoveryController],
})
export class ServiceDiscoveryModule {}
