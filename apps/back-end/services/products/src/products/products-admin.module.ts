import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ProductsAdminResolver } from './products-admin.resolver';

@Module({
  imports: [CqrsModule],
  providers: [ProductsAdminResolver],
})
export class ProductsAdminModule {}
