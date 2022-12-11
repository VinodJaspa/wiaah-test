import { Module } from '@nestjs/common';
import { ProductsAdminResolver } from './products-admin.resolver';

@Module({
  providers: [ProductsAdminResolver],
})
export class ProductsAdminModule {}
