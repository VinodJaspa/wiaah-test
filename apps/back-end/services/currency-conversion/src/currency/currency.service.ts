import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateCurrencyInput } from './dto/update-currency.input';
import { Currency } from './entities/currency.entity';
import { FixerService } from 'src/fixer/fixer.service';
import { FormatedRate } from 'src/fixer/types/formatedRate';

@Injectable()
export class CurrencyService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fixerService: FixerService,
  ) {}

  private readonly logger = new Logger(CurrencyService.name);

  async getCurrencyDataByCode(code: string): Promise<Currency> {
    const currency = await this.prisma.currency.findUnique({
      where: {
        code: code.toUpperCase(),
      },
      rejectOnNotFound(error) {
        throw new NotFoundException(
          'currency with the give code was not found',
        );
      },
    });

    return currency;
  }

  getAllCurrenices() {
    return this.prisma.currency.findMany();
  }

  async createOrUpdateCurrency(
    code: string,
    name: string,
    rate: number,
  ): Promise<Currency> {
    return this.prisma.currency.upsert({
      create: {
        name,
        code,
        exchangeRate: rate,
      },
      update: {
        exchangeRate: rate,
        name,
      },
      where: {
        code,
      },
      select: {
        code: true,
        exchangeRate: true,
        name: true,
        updatedAt: true,
        id: true,
      },
    });
  }

  async createInitialCurrencies(): Promise<Currency[]> {
    const currenices = await this.fixerService.getCurrenciesNames();

    const res = currenices.map(
      async ({ code, name }: { code: string; name: string }) => {
        const currency = await this.createOrUpdateCurrency(code, name, 0);
        return currency;
      },
    );
    return Promise.all(res);
  }

  async updateCurrency({
    code,
    ...rest
  }: UpdateCurrencyInput): Promise<Currency> {
    console.log('input', code, rest);
    try {
      const updatedCurrency = await this.prisma.currency.update({
        where: {
          code,
        },
        data: rest,
        select: {
          code: true,
          exchangeRate: true,
          id: true,
          name: true,
          updatedAt: true,
        },
      });

      return updatedCurrency;
    } catch (error) {
      throw new InternalServerErrorException('updating currency date failed');
    }
  }

  // @Cron(CronExpression.EVERY_10_HOURS)
  async updateCurrnciesData(): Promise<Currency[]> {
    const currencies = await this.getAllCurrenices();
    const codes = currencies.map((currency) => currency.code);
    const newRates = await this.fixerService.getCurrenciesRates(codes, 'USD');

    this.logger.log(newRates);
    const updatedRates = newRates.map(async ({ code, rate }) => {
      return await this.updateCurrency({ code, exchangeRate: rate });
    });
    return Promise.all(updatedRates);
  }
}
