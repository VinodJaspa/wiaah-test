import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UploadModule, UploadServiceProviders } from '@wiaah/upload';
import { ProductsAdminResolver } from './products-admin.resolver';

@Module({
  imports: [
    CqrsModule,
    UploadModule.forRoot({
      secretKey: 'secret',
      serviceKey: 'servicekey',
      provider: UploadServiceProviders.CLOUDFLARE,
      cloudName: undefined
    }),
  ],
  providers: [ProductsAdminResolver],
})
export class ProductsAdminModule {}
