import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { Prisma } from '@prisma-client';
import { accountType, GqlAuthorizationGuard } from 'nest-utils';
import { PrismaService } from 'src/prisma.service';
import { CurrencyService } from './currency.service';
import { AdminGetCurrenciesInput } from './dto/get-admin-currencies.input';
import { UpdateCurrencyInput } from './dto/update-currency.input';
import { Currency } from './entities/currency.entity';

@Resolver(() => Currency)
export class CurrencyResolver {
  constructor(
    private readonly currencyService: CurrencyService,
    private readonly prisma: PrismaService,
  ) {}

  @Query((returns) => Currency)
  getCurrencyData(@Args('currencyCode') code: string): Promise<Currency> {
    return this.currencyService.getCurrencyDataByCode(code);
  }

  @Query((type) => [Currency])
  getCurrencies() {
    return this.currencyService.getAllCurrenices();
  }

  @Query((type) => [Currency])
  adminGetCurrencies(@Args('args') args: AdminGetCurrenciesInput) {
    let filters: Prisma.CurrencyWhereInput[] = [];

    if (args.title) {
      filters.push({
        name: args.title,
      });
    }

    if (args.code) {
      filters.push({
        code: args.code,
      });
    }

    if (args.rate) {
      filters.push({
        exchangeRate: {
          gte: args.rate,
        },
      });

      filters.push({
        exchangeRate: {
          lte: Math.ceil(args.rate),
        },
      });
    }

    if (args.enabled) {
      filters.push({
        enabled: args.enabled,
      });
    }

    return this.prisma.currency.findMany({
      where: {
        AND: filters,
      },
    });
  }

  @Mutation((type) => Currency)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  updateCurrency(@Args('updateCurrencyArgs') input: UpdateCurrencyInput) {
    return this.currencyService.updateCurrency(input);
  }

  @Mutation((type) => [Currency])
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  createInitialCurrencies(): Promise<Currency[]> {
    return this.currencyService.createInitialCurrencies();
  }

  @Mutation((type) => [Currency])
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  updateCurrenciesRates(): Promise<Currency[]> {
    return this.currencyService.updateCurrnciesData();
  }

  @ResolveReference()
  resolve(ref: { __typename: string; code: string }) {
    return this.currencyService.getCurrencyDataByCode(ref.code);
  }
}
