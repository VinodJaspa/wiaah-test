import { Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistResolver } from './wishlist.resolver';
import { PrismaService } from 'prismaService';
import { WishlistController } from './wishlist.controler';
import { WisherslistModule } from '@wishersList';
import { WishlistItemResolver } from './wishlistItem.resolver';
import { WishedItemResolver } from './wishlist.admin.resolver';

@Module({
  imports: [WisherslistModule],
  controllers: [WishlistController],
  providers: [
    WishlistResolver,
    WishlistService,
    WishlistItemResolver,
    PrismaService,
    WishedItemResolver,
  ],
})
export class WishlistModule {}
