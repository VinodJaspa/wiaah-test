import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { accountType, GqlAuthorizationGuard } from 'nest-utils';
import { CurrencyService } from './currency.service';
import { UpdateCurrencyInput } from './dto/update-currency.input';
import { Currency } from './entities/currency.entity';

@Resolver(() => Currency)
export class CurrencyResolver {
  constructor(private readonly currencyService: CurrencyService) {}

  @Query((returns) => Currency)
  getCurrencyData(@Args('currencyCode') code: string): Promise<Currency> {
    return this.currencyService.getCurrencyDataByCode(code);
  }

  @Query((type) => [Currency])
  getCurrencies() {
    return this.currencyService.getAllCurrenices();
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
}
