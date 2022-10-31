import { Global, Module } from '@nestjs/common';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { BookServiceModule } from './book-service/book-service.module';
import { PrismaService } from 'prismaService';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
class PrismaModule {}

@Module({
  imports: [ShoppingCartModule, BookServiceModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
