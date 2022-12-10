import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma-client';
import { PrismaService } from 'prismaService';
import { GetFilteredCategory } from './dto';

import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllCategories(filter?: GetFilteredCategory): Promise<Category[]> {
    const filters: Prisma.ProductCategoryWhereInput[] = [];

    if (filter?.name)
      filters.push({
        name: { contains: filter.name },
      });

    if (filter?.sortOrder)
      filters.push({
        sortOrder: filter.sortOrder,
      });

    return this.prisma.productCategory.findMany(
      filters.length > 0 ? { where: { AND: filters } } : undefined,
    );
  }

  async createCategory(
    input: CreateCategoryInput,
    userId: string,
  ): Promise<Category> {
    return this.prisma.productCategory.create({
      data: input,
    });
  }

  async updateCategory(
    input: UpdateCategoryInput,
    userId: string,
  ): Promise<Category> {
    const { id, ...rest } = input;

    return this.prisma.productCategory.update({
      where: {
        id,
      },
      data: rest,
    });
  }

  async deleteCategory(id: string, userId: string): Promise<Category> {
    const deletedCategory = await this.prisma.productCategory.delete({
      where: {
        id,
      },
    });

    // delete sub categories

    await this.prisma.productCategory.deleteMany({
      where: {
        parantId: deletedCategory.id,
      },
    });

    return deletedCategory;
  }
}
