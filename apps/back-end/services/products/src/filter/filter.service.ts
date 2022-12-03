import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prismaService';
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

  getFilters(): Promise<Filter[]> {
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
