import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';
import { PrismaService } from 'prismaService';

@Module({
  providers: [CategoryResolver, CategoryService, PrismaService],
})
export class CategoryModule {}
