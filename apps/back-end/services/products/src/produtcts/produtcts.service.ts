import { Injectable } from '@nestjs/common';
import { Prisma, Product } from '@prisma-client';
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

  async createPh() {
    try {
      await this.prisma.product.createMany({
        data: ProductsPh,
      });
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
}

const ProductsPh: Prisma.ProductCreateInput[] = [
  {
    category: 'test',
    description: 'test product description',
    rate: 5,
    stock: 13,
    storeId: '1234',
    title: 'a',
  },
  {
    category: 'test',
    description: 'test product description',
    rate: 5,
    stock: 13,
    storeId: '1234',
    title: 'b',
  },
  {
    category: 'test',
    description: 'test product description',
    rate: 5,
    stock: 13,
    storeId: '1234',
    title: 'c',
  },
  {
    category: 'test',
    description: 'test product description',
    rate: 5,
    stock: 13,
    storeId: '1234',
    title: 'd',
  },
  {
    category: 'test',
    description: 'test product description',
    rate: 5,
    stock: 13,
    storeId: '1234',
    title: 'e',
  },
];
