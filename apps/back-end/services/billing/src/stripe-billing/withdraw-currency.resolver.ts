import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Currency, WithdrawCurrency } from './entities';

@Resolver(() => WithdrawCurrency)
export class WithdrawCurrencyResolver {
  @Query(() => [WithdrawCurrency])
  getWithdrawCurrencies(): WithdrawCurrency[] {
    return [
      {
        code: 'USD',
      },
      {
        code: 'CHF',
      },
      {
        code: 'GBP',
      },
      {
        code: 'EUR',
      },
    ];
  }

  @ResolveField(() => Currency)
  currency(@Parent() curr: WithdrawCurrency) {
    return {
      __typename: 'Currency',
      code: curr.code,
    };
  }
}
