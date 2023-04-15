import { Injectable } from '@nestjs/common';
import { Prisma } from 'prismaClient';
import { PrismaService } from 'prismaService';
import { CreateServiceCategoryInput } from './dto/create-category.input';
import { GetFilteredCategoriesInput } from './dto/get-filtered-categories.input';
import { UpdateServiceCategoryInput } from './dto/update-category.input';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  create(input: CreateServiceCategoryInput, userId: string) {
    return this.prisma.serviceCategory.create({
      data: { ...input, createdByUserId: userId },
    });
  }

  remove(id: string, userId: string) {
    return this.prisma.serviceCategory.delete({
      where: {
        id,
      },
    });
  }

  update(input: UpdateServiceCategoryInput, userId: string) {
    const { id, ...rest } = input;
    return this.prisma.serviceCategory.update({
      where: {
        id,
      },
      data: rest,
    });
  }

  getCategoryById(id: string, userId: string) {
    return this.prisma.serviceCategory.findUnique({
      where: {
        id,
      },
    });
  }

  getAllCategories() {
    return this.prisma.serviceCategory.findMany({
      where: {
        status: 'active',
      },
      orderBy: {
        sortOrder: 'desc',
      },
    });
  }

  getAllFilteredCategories(filter?: GetFilteredCategoriesInput) {
    const filters: Prisma.ServiceCategoryWhereInput[] = [];

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

    return this.prisma.serviceCategory.findMany(
      filters.length > 0 ? { where: { AND: filters } } : undefined,
    );
  }
}
