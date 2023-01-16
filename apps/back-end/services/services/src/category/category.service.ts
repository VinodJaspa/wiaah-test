import { Injectable } from '@nestjs/common';
import { Prisma } from 'prismaClient';
import { PrismaService } from 'prismaService';
import { CreateCategoryInput } from './dto/create-category.input';
import { GetFilteredCategoriesInput } from './dto/get-filtered-categories.input';
import { UpdateCategoryInput } from './dto/update-category.input';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  create(input: CreateCategoryInput, userId: string) {
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

  update(input: UpdateCategoryInput, userId: string) {
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
        OR: [
          {
            name: {
              some: {
                value: {
                  contains: filter.name,
                },
              },
            },
          },
          {
            filters: {
              some: {
                filterGroupName: {
                  some: {
                    value: {
                      contains: filter.name,
                    },
                  },
                },
              },
            },
          },
          {
            filters: {
              some: {
                filterValues: {
                  some: {
                    name: {
                      some: {
                        value: {
                          contains: filter.name,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        ],
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
