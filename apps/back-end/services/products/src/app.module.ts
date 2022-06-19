import { Module } from '@nestjs/common';
import { ProdutctsModule } from './produtcts/produtcts.module';

@Module({
  imports: [ProdutctsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
