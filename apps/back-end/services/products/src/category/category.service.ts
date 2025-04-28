import { Injectable } from '@nestjs/common';
import { Prisma, ProductCategory } from '@prisma-client';
import { PrismaService } from 'prismaService';
import { GetFilteredCategory } from './dto';

import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities';
import { UserPreferedLang, getTranslatedResource } from 'nest-utils';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllCategories(
    filter?: GetFilteredCategory,
    langId: UserPreferedLang = 'en',
  ): Promise<Category[]> {
    const filters: Prisma.ProductCategoryWhereInput[] = [];

    if (filter?.name)
      filters.push({
        name: {
          some: {
            value: {
              contains: filter.name,
            },
          },
        },
      });

    if (filter?.sortOrder)
      filters.push({
        sortOrder: filter.sortOrder,
      });

    const res = await this.prisma.productCategory.findMany(
      filters.length > 0 ? { where: { AND: filters } } : undefined,
    );
    return res.map((v) => this.formatCategory(v, langId));
  }

  async getOneById(id: string, langId: string): Promise<Category | null> {
    const cate = await this.prisma.productCategory.findUnique({
      where: {
        id,
      },
    });

    return this.formatCategory(cate, langId);
  }

  async createCategory(
    input: CreateCategoryInput,
    userId: string,
  ): Promise<boolean> {
    try {
      await this.prisma.productCategory.create({
        // @ts-ignore
        data: input,
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  async updateCategory(
    input: UpdateCategoryInput,
    userId: string,
  ): Promise<boolean> {
    try {
      const { id, ...rest } = input;

      await this.prisma.productCategory.update({
        where: {
          id,
        },
        // @ts-ignore
        data: rest,
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async deleteCategory(id: string, userId: string): Promise<boolean> {
    try {
      const deletedCategory = await this.prisma.productCategory.delete({
        where: {
          id,
        },
      });

      //TODO: delete sub categories

      await this.prisma.productCategory.deleteMany({
        where: {
          parantId: deletedCategory.id,
        },
      });

      return true;
    } catch (error) {
      return false;
    }
  }

  formatCategory(rawCategory: ProductCategory, langId: string): Category {
    return {
      ...rawCategory,
      name: getTranslatedResource({
        langId,
        resource: rawCategory.name,
      }),
    };
  }
}
