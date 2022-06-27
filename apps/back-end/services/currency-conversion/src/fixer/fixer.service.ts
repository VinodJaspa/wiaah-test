import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { INJECT_TOKENS } from 'src/INJECT_TOKENS';
import { FormatedCurrencyName } from './types/formatedCurrencyName';
import { FormatedRate } from './types/formatedRate';
import { FixerServiceOptions } from './types/forRootOptions';

@Injectable()
export class FixerService {
  private headers: Record<string, any> = {};
  private readonly logger = new Logger(FixerService.name);
  constructor(
    private readonly httpService: HttpService,
    @Inject(INJECT_TOKENS.FIXER_TOKEN)
    readonly options: FixerServiceOptions,
  ) {
    this.headers.apikey = options.apiKey;
  }

  async getCurrenciesNames(): Promise<{ code: string; name: string }[]> {
    return new Promise((res, rej) => {
      this.httpService
        .get('https://api.apilayer.com/currency_data/list', {
          headers: this.headers,
        })
        .subscribe((response) => {
          try {
            const symbols: Record<string, string> = response.data.currencies;
            if (typeof symbols !== 'object')
              return this.logger.debug(response.data);
            const formatedNames: FormatedCurrencyName[] = Object.entries(
              symbols,
            ).map(([code, name]) => ({
              code,
              name,
            }));
            res(formatedNames);
          } catch (error) {
            this.logger.error(error);
            rej('getting currencies names failed');
          }
        });
    });
  }

  async getCurrenciesRates(
    targetedCurrencies: string[],
    base: string,
  ): Promise<FormatedRate[]> {
    const symbols = targetedCurrencies.reduce((acc, curr, idx) => {
      const isLast = targetedCurrencies.length - 1 === idx;
      return `${acc}${curr}${isLast ? '' : ','}`;
    }, '');

    return new Promise((res, rej) => {
      this.httpService
        .get(
          `https://api.apilayer.com/fixer/latest?symbols=${symbols}&base=${base}`,
          {
            headers: this.headers,
          },
        )
        .subscribe((results) => {
          try {
            const rates: Record<string, number> = results.data.rates;

            const formatedRates: FormatedRate[] = Object.entries(rates).map(
              ([key, value]: [string, number]) => ({
                code: key,
                rate: value,
              }),
            );

            res(formatedRates);
          } catch (err) {
            this.logger.error(err);
            rej('error fetching new currencies rate');
          }
        });
    });
  }
}
