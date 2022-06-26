import { Injectable } from '@nestjs/common';
import { CurrencyName } from '@prisma-client';
import { PrismaService } from 'src/prisma.service';
import { CreateCurrencyInput } from './dto/create-currency.input';
import { UpdateCurrencyInput } from './dto/update-currency.input';
import { Currency } from './entities/currency.entity';

@Injectable()
export class CurrencyService {
  constructor(private readonly prisma: PrismaService) {}

  async getCurrencyData(currencyName: CurrencyName): Promise<Currency> {
    const currency = await this.prisma.currency.findUnique({
      where: {
        name: currencyName,
      },
    });

    return currency;
  }

  async updateCurrency({
    name,
    ...rest
  }: UpdateCurrencyInput): Promise<Boolean> {
    await this.prisma.currency.update({
      where: {
        name,
      },
      data: rest,
    });

    return true;
  }
}
