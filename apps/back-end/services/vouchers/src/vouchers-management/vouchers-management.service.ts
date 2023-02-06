import { CreateVoucherInput, DeleteVoucherInput, GetVouchersInput } from '@dto';
import { Voucher, VoucherCluster } from '@entities';
import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Prisma, VoucherStatus } from '@prisma-client';
import {
  NotEnoughBalanceException,
  VoucherAlreadyExistsException,
  VoucherNotActiveException,
  VoucherNotFoundException,
} from 'src/exceptions';
import { PrismaService } from 'src/prisma.service';
import {
  ApplyFiltersOnArray,
  AuthorizationDecodedUser,
  generateFiltersOfArgs,
  KafkaMessageHandler,
  KAFKA_EVENTS,
  KAFKA_MESSAGES,
  KAFKA_SERVICE_TOKEN,
  SERVICES,
} from 'nest-utils';
import { ClientKafka } from '@nestjs/microservices';
import {
  GetCurrencyExchangeRateMessage,
  GetCurrencyExchangeRateMessageReply,
  GetUserCashbackBalanceMessage,
  GetUserCashbackBalanceMessageReply,
  VoucherAppliedEvent,
} from 'nest-dto';

@Injectable()
export class VouchersManagementService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(SERVICES.VOUCHERS_SERVICE.token)
    private readonly eventsClient: ClientKafka,
  ) {}

  clear() {
    return this.prisma.voucherCluster.deleteMany();
  }

  async getMyVouchers(
    { id, shopId }: AuthorizationDecodedUser,
    filters?: GetVouchersInput,
  ): Promise<Voucher[]> {
    return this.getVouchersByOwnerId(id, filters);
  }

  async getVouchersByOwnerId(
    ownerId: string,
    filters?: GetVouchersInput,
  ): Promise<Voucher[]> {
    const prismaFilters: Prisma.VoucherWhereInput[] = [];

    if (filters.status) {
      prismaFilters.push({
        status: filters.status,
      });
    }

    const vouchers = await this.prisma.voucher.findMany({
      where: {
        AND: [
          {
            ownerId,
          },
          ...prismaFilters,
        ],
      },
    });

    return vouchers;
  }

  // async getVouchersByShopId(
  //   shopId: string,
  //   filters?: GetVouchersInput,
  // ): Promise<Voucher[]> {
  //   const genFilters = generateFiltersOfArgs(filters, ['status']);
  //   const cluster = await this.prisma.voucherCluster.findUnique({
  //     where: {
  //       shopId,
  //     },
  //     rejectOnNotFound(error) {
  //       throw new VoucherNotFoundException('shop id');
  //     },
  //   });
  //   return ApplyFiltersOnArray<Voucher>(cluster.vouchersList, genFilters);
  // }

  async createVoucher(
    userId: string,
    input: CreateVoucherInput,
  ): Promise<Voucher> {
    const { code } = input;
    const [exists, voucher] = await this.VoucherExists(userId, code);

    if (exists) throw new VoucherAlreadyExistsException('code');

    const newVoucher: Voucher = { ...input, status: 'active' };

    await this.prisma.voucher.create({
      data: {
        ...input,
        ownerId: userId,
        status: 'active',
      },
    });

    return newVoucher;
  }

  async VoucherExists(
    sellerId: string,
    voucherCode: string,
  ): Promise<[boolean, Voucher]> {
    const v = await this.prisma.voucher.findFirst({
      where: {
        AND: [
          {
            ownerId: sellerId,
          },
          {
            code: voucherCode,
          },
        ],
      },
    });

    return [!!v, v];
  }

  async deactivateVoucher(
    sellerId: string,
    voucherCode: string,
  ): Promise<Voucher> {
    return this.changeVoucherStatus(sellerId, voucherCode, 'inActive');
  }
  async activateVoucher(
    sellerId: string,
    voucherCode: string,
  ): Promise<Voucher> {
    return this.changeVoucherStatus(sellerId, voucherCode, 'active');
  }
  async changeVoucherStatus(
    sellerId: string,
    voucherCode: string,
    status: VoucherStatus,
  ): Promise<Voucher> {
    const v = await this.prisma.voucher.findFirst({
      where: {
        AND: [{ ownerId: sellerId }, { code: voucherCode }],
      },
    });

    if (!v) throw new VoucherNotFoundException('code');

    const res = await this.prisma.voucher.update({
      where: {
        id: v.id,
      },
      data: {
        status,
      },
    });

    return res;
  }

  async deleteVoucher(
    ownerId: string,
    input: DeleteVoucherInput,
  ): Promise<boolean> {
    try {
      const deleted = await this.prisma.voucher.deleteMany({
        where: {
          AND: [
            {
              ownerId,
            },
            {
              code: input.voucherCode,
            },
          ],
        },
      });

      return true;
    } catch {
      throw new VoucherNotFoundException();
    }
  }

  async isVoucherApplyable(
    userId: string,
    voucherCode: string,
  ): Promise<
    [
      boolean,
      Voucher & { convertedAmount: number; convertedToCurrency: string },
    ]
  > {
    const [exists, voucher] = await this.VoucherExists(userId, voucherCode);
    const { amount, code, currency, status } = voucher;

    if (status !== 'active') throw new VoucherNotActiveException();

    if (!exists) throw new VoucherNotFoundException();

    const {
      results: { data, error, success },
    } = await KafkaMessageHandler<
      any,
      GetUserCashbackBalanceMessage,
      GetUserCashbackBalanceMessageReply
    >(
      this.eventsClient,
      KAFKA_MESSAGES.BILLING_MESSAGES.getUserCashbackBalance,
      new GetUserCashbackBalanceMessage({ userId }),
    );

    if (!success) throw new Error(error.message);

    const { cashbackBalance } = data;

    const {
      results: {
        data: currencyData,
        error: currencyError,
        success: currencySuccess,
      },
    } = await KafkaMessageHandler<
      any,
      GetCurrencyExchangeRateMessage,
      GetCurrencyExchangeRateMessageReply
    >(
      this.eventsClient,
      KAFKA_MESSAGES.CURRENCY_MESSAGES.getCurrencyExchangeRate,
      new GetCurrencyExchangeRateMessage({
        targetCurrencyCode: currency,
      }),
      'checking cashback balance process timedout, try again later',
    );

    if (!currencySuccess) throw new Error(currencyError.message);

    const { rate, convertedToCurrency, convertedFromCurrency } = currencyData;

    const convertedAmount = amount / rate;
    console.log('convertedAmount', convertedAmount);

    if (convertedAmount > cashbackBalance)
      throw new NotEnoughBalanceException();

    return [
      true,
      {
        amount,
        code,
        convertedAmount,
        currency,
        status,
        convertedToCurrency: convertedFromCurrency,
      },
    ];
  }
}
