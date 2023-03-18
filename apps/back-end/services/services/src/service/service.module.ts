import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceResolver } from './service.resolver';
import { AdminServiceResolver } from './service.admin.resolver';
import { UploadModule, UploadServiceProviders } from '@wiaah/upload';

@Module({
  imports: [
    UploadModule.forRoot({
      secretKey: 'secret',
      serviceKey: 'servicekey',
      provider: UploadServiceProviders.CLOUDFLARE,
    }),
  ],
  providers: [ServiceResolver, ServiceService, AdminServiceResolver],
})
export class ServiceModule {}
