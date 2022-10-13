import { Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistResolver } from './wishlist.resolver';
import { PrismaService } from 'prismaService';
import { WishlistController } from './wishlist.controler';
import { WisherslistModule } from '@wishersList';

@Module({
  imports: [WisherslistModule],
  controllers: [WishlistController],
  providers: [WishlistResolver, WishlistService, PrismaService],
})
export class WishlistModule {}
