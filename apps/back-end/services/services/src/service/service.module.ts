import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceResolver } from './service.resolver';
import { AdminServiceResolver } from './service.admin.resolver';

@Module({
  providers: [ServiceResolver, ServiceService, AdminServiceResolver],
})
export class ServiceModule {}
