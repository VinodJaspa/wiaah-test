import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ExtractPagination } from 'nest-utils';
import { Prisma } from 'prismaClient';
import { PrismaService } from 'prismaService';
import { CreateTaxRateInput, UpdateTaxRateInput } from './dto';
import { AdminGetTaxRatesInput } from './dto/admin-get-tax-rates.input';
import { TaxRate } from './entities/tax-rate.entity';
import { Country } from '../country/entities/country.entity';

@Resolver(() => TaxRate)
export class TaxRateResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => TaxRate)
  async adminGetTaxRate(@Args('id') id: string) {
    return this.prisma.taxRate.findUnique({
      where: {
        id,
      },
    });
  }

  @Query(() => [TaxRate])
  async adminGetTaxRates(
    @Args('args') args: AdminGetTaxRatesInput,
  ): Promise<TaxRate[]> {
    const filters: Prisma.TaxRateWhereInput[] = [];

    const { skip, take } = ExtractPagination(args.pagination);

    if (args.name) {
      filters.push({
        title: {
          contains: args.name,
        },
      });
    }

    if (args.rate) {
      filters.push({
        percent: args.rate,
      });
    }

    const res = await this.prisma.taxRate.findMany({
      where: {
        AND: filters,
      },
      take,
      skip,
    });

    return res;
  }

  @Mutation(() => Boolean)
  async createTaxRate(@Args('args') args: CreateTaxRateInput) {
    const res = await this.prisma.taxRate.create({
      data: args,
    });

    return true;
  }

  @Mutation(() => Boolean)
  async updateTaxRate(@Args('args') args: UpdateTaxRateInput) {
    const res = await this.prisma.taxRate.update({
      where: {
        id: args.id,
      },
      data: args,
    });

    return true;
  }

  @ResolveField(() => [Country])
  appliedOnCountries(@Parent() parent: TaxRate) {
    return this.prisma.country.findMany({
      where: {
        id: {
          in: parent.appliedOnCountryIds,
        },
      },
    });
  }
}
