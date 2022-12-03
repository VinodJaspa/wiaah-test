import { Module } from '@nestjs/common';
import { WisherslistService } from './wisherslist.service';
import { WisherslistResolver } from './wisherslist.resolver';
import { PrismaService } from 'prismaService';
import { WisherslistController } from './wisherslist.controller';

@Module({
  controllers: [WisherslistController],
  providers: [WisherslistResolver, WisherslistService, PrismaService],
  exports: [WisherslistService],
})
export class WisherslistModule {}
