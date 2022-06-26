import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrencyName } from '@prisma-client';
import { CurrencyService } from './currency.service';
import { Currency } from './entities/currency.entity';

@Resolver(() => Currency)
export class CurrencyResolver {
  constructor(private readonly currencyService: CurrencyService) {}

  @Query((returns) => Currency)
  getCurrencyData(
    @Args('currencyName') currency: CurrencyName,
  ): Promise<Currency> {
    return this.currencyService.getCurrencyData(currency);
  }

  // @Mutation((returns)=> Boolean)
  // updateCurrency():Promise<Boolean>{
  //   return this.currencyService.updateCurrency()
  // }
}
