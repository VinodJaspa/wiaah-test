import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma-client';
import { PrismaService } from 'prismaService';
import { GetFiltersInput } from './dto';
import { CreateFilterInput } from './dto/create-filter.input';
import { UpdateFilterInput } from './dto/update-filter.input';
import { Filter } from './entities/filter.entity';

@Injectable()
export class FilterService {
  constructor(private readonly prisma: PrismaService) {}

  createFilter(input: CreateFilterInput, userId: string): Promise<Filter> {
    return this.prisma.productFilterGroup.create({
      data: input,
    });
  }

  updateFilter(input: UpdateFilterInput, userId: string): Promise<Filter> {
    const { id, ...rest } = input;
    return this.prisma.productFilterGroup.update({
      where: {
        id,
      },
      data: rest,
    });
  }

  getFilters(filtersInput: GetFiltersInput): Promise<Filter[]> {
    const filters: Prisma.ProductFilterGroupWhereInput[] = [];

    if (filtersInput.name)
      filters.push({
        OR: [
          {
            name: { contains: filtersInput.name },
          },
          {
            values: {
              some: {
                name: {
                  contains: filtersInput.name,
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

    return this.prisma.productFilterGroup.findMany();
  }

  deleteFilter(id: string, userId: string): Promise<Filter> {
    return this.prisma.productFilterGroup.delete({
      where: {
        id,
      },
    });
  }
}
