import { Module } from '@nestjs/common';
import { ProdutctsModule } from './products/products.module';

@Module({
  imports: [ProdutctsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
