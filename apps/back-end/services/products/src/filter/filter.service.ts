import { Injectable } from '@nestjs/common';
import { Prisma, ProductFilterGroup as PrismaFilter } from '@prisma-client';
import { getTranslatedResource, UserPreferedLang } from 'nest-utils';
import { PrismaService } from 'prismaService';
import { GetFiltersInput } from './dto';
import { CreateFilterInput } from './dto/create-filter.input';
import { UpdateFilterInput } from './dto/update-filter.input';
import { Filter } from './entities/filter.entity';

@Injectable()
export class FilterService {
  constructor(private readonly prisma: PrismaService) {}

  async createFilter(
    input: CreateFilterInput,
    userId: string,
    lang: UserPreferedLang = 'en',
  ): Promise<Filter> {
    const res = await this.prisma.productFilterGroup.create({
      // @ts-ignore
      data: input,
    });

    return this.formatfilter(res, lang);
  }

  async updateFilter(
    input: UpdateFilterInput,
    userId: string,
    lang: UserPreferedLang = 'en',
  ): Promise<Filter> {
    const { id, ...rest } = input;
    const res = await this.prisma.productFilterGroup.update({
      where: {
        id,
      },
      // @ts-ignore
      
      data: rest,
    });

    return this.formatfilter(res, lang);
  }

  async getFilters(
    filtersInput: GetFiltersInput,
    lang: string = 'en',
  ): Promise<Filter[]> {
    const filters: Prisma.ProductFilterGroupWhereInput[] = [];

    if (filtersInput.name)
      filters.push({
        OR: [
          {
            name: { some: { value: { contains: filtersInput.name } } },
          },
          {
            values: {
              some: {
                name: {
                  some: {
                    value: {
                      contains: filtersInput.name,
                    },
                  },
                },
              },
            },
          },
        ],
      });
    if (filtersInput.sortOrder)
      filters.push({
        OR: [
          {
            sortOrder: filtersInput.sortOrder,
          },
          {
            values: {
              some: {
                sortOrder: filtersInput.sortOrder,
              },
            },
          },
        ],
      });

    const res = await this.prisma.productFilterGroup.findMany({
      where: { AND: filters },
    });
    return res.map((v) => this.formatfilter(v, lang));
  }

  getFilterById(id: string) {
    return this.prisma.productFilterGroup.findUnique({
      where: {
        id,
      },
    });
  }

  async deleteFilter(
    id: string,
    userId: string,
    lang: UserPreferedLang = 'en',
  ): Promise<Filter> {
    const res = await this.prisma.productFilterGroup.delete({
      where: {
        id,
      },
    });

    return this.formatfilter(res, lang);
  }

  formatfilter(filter: PrismaFilter, langId: UserPreferedLang): Filter {
    return {
      ...filter,
      name: getTranslatedResource({ langId, resource: filter.name }),
      values: filter.values.map((v) => ({
        ...v,
        name: getTranslatedResource({ langId, resource: v.name }),
      })),
    };
  }
}
