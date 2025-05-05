import { Module } from '@nestjs/common';
import { ProductAttributeService } from './product-attribute.service';
import { ProductAttributeResolver } from './product-attribute.resolver';

@Module({
  providers: [ProductAttributeResolver, ProductAttributeService],
})
export class ProductAttributeModule {}
