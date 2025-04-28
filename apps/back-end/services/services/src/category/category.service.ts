import { Injectable } from '@nestjs/common';
import { Prisma, ServiceCategory } from 'prismaClient';
import { PrismaService } from 'prismaService';
import { CreateServiceCategoryInput } from './dto/create-category.input';
import { GetFilteredCategoriesInput } from './dto/get-filtered-categories.input';
import { UpdateServiceCategoryInput } from './dto/update-category.input';
import { ServiceCategory as ServiceCategoryEntity } from './entities/category.entity';
import { getTranslatedResource } from 'nest-utils';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  create(input: CreateServiceCategoryInput, userId: string) {
    return this.prisma.serviceCategory.create({
      // @ts-ignore
      data: {
        ...input,
        createdByUserId: userId,
        description: { set: input.description as any },
        name: { set: input.name as any },
        seo: { set: input.seo as any },
        metaTagTitle: { set: input.metaTagTitle as any },
        metaTagDescription: { set: input.metaTagDescription as any },
        metaTagKeywords: { set: input.metaTagKeywords as any },
      },
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
      // @ts-ignore
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

  formatServiceCategory(
    category: ServiceCategory,
    langId: string,
  ): ServiceCategoryEntity {
    return {
      ...category,
      description: getTranslatedResource({
        langId,
        resource: category.description,
      }),
      name: getTranslatedResource({
        langId,
        resource: category.name,
      }),
      seo: getTranslatedResource({
        langId,
        resource: category.seo,
      }),
      metaTagTitle: getTranslatedResource({
        langId,
        resource: category.metaTagTitle,
      }),
      metaTagDescription: getTranslatedResource({
        langId,
        resource: category.metaTagDescription,
      }),
      metaTagKeywords: getTranslatedResource({
        langId,
        resource: category.metaTagKeywords,
      }),
      filters: category.filters.map((v, i) => ({
        ...v,
        name: getTranslatedResource({
          langId,
          resource: v.name,
        }),
      })),
    };
  }
}
