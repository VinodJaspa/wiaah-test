export class GetCurrencyExchangeQuery {
  constructor(public amount: number, public currency: string) {}
}

export type GetCurrencyExchangeQueryRes = {
  amount: number;
  currency: string;
  symbol: string;
};
