import { Global, Module } from '@nestjs/common';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { PrismaService } from 'prismaService';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
class PrismaModule {}

@Module({
  imports: [ShoppingCartModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
