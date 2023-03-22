import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceResolver } from './service.resolver';
import { AdminServiceResolver } from './service.admin.resolver';
import { UploadModule, UploadServiceProviders } from '@wiaah/upload';
import { ServiceDetailsResolver } from './service-details.resolver';
import { resolvers } from './resolvers';

@Module({
  imports: [
    UploadModule.forRoot({
      secretKey: 'secret',
      serviceKey: 'servicekey',
      provider: UploadServiceProviders.CLOUDFLARE,
    }),
  ],
  providers: [
    ServiceResolver,
    ServiceService,
    AdminServiceResolver,
    ServiceDetailsResolver,
    ...resolvers,
  ],
})
export class ServiceModule {}
