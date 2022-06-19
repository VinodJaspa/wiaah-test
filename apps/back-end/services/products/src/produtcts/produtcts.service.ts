import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Prisma.service';
import { CreateProdutctInput } from './dto/create-produtct.input';

@Injectable()
export class ProdutctsService {
  constructor(private readonly prisma: PrismaService) {}

  createNewProduct(createProductInput: CreateProdutctInput) {
    return this.prisma.product.create({
      data: {
        ...createProductInput,
        rate: 0,
        storeId: '132',
        presentations: [],
      },
    });
  }

  getProductById(productId: string) {
    return this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });
  }

  getAll() {
    return this.prisma.product.findMany();
  }

  async deleteAll() {
    try {
      await this.prisma.product.deleteMany();
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  getAllByShopId(shopId: string) {
    return this.prisma.product.findMany({
      where: {
        storeId: shopId,
      },
    });
  }
}
