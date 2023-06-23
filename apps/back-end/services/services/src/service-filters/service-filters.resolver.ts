import { Args, Query, Resolver } from '@nestjs/graphql';
import {
  ServiceFilter,
  ServiceFilterRaw,
} from './entities/service-filter.entity';
import { PrismaService } from 'prismaService';
import { ServiceType } from 'prismaClient';
import { GetLang, UserPreferedLang, getTranslatedResource } from 'nest-utils';

@Resolver(() => ServiceFilter)
export class ServiceFiltersResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => [ServiceFilter])
  async getServiceCategoryFilters(
    @Args('category', { type: () => ServiceType }) category: ServiceType,
    @GetLang() langId: UserPreferedLang,
  ): Promise<ServiceFilter[]> {
    const serviceCategory = await this.prisma.serviceCategory.findUnique({
      where: {
        type: category,
      },
    });
    if (serviceCategory) {
      const filters = await this.prisma.serviceCategoryFilter.findMany({
        where: {
          categoryId: serviceCategory.id,
        },
        orderBy: {
          sortOrder: 'desc',
        },
      });

      return filters.map((filter) => this.formatServiceFilter(filter, langId));
    } else {
      return [];
    }
  }

  formatServiceFilter(
    rawFilter: ServiceFilterRaw,
    langId: string,
  ): ServiceFilter {
    return {
      ...rawFilter,
      filterGroupName: getTranslatedResource({
        langId,
        resource: rawFilter.filterGroupName,
      }),
      filterValues: rawFilter.filterValues.map((values, i) => ({
        ...values,
        name: getTranslatedResource({ langId, resource: values.name }),
      })),
    };
  }
}
