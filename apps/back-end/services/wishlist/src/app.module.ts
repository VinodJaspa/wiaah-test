import { Module } from '@nestjs/common';
import { WishlistModule } from './wishlist/wishlist.module';
import { WisherslistModule } from './wisherslist/wisherslist.module';

@Module({
  imports: [WishlistModule, WisherslistModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
