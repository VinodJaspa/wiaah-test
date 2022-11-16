import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma-client';
import { PrismaService } from 'prismaService';

@Injectable()
export class ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async update(id: string, input: Prisma.ProductUpdateInput) {
    return await this.prisma.product.update({
      where: {
        id,
      },
      data: input,
    });
  }
}
