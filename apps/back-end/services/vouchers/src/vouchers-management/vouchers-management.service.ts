import { CreateVoucherInput, DeleteVoucherInput, GetVouchersInput } from '@dto';
import { Voucher, VoucherCluster } from '@entities';
import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { VoucherStatus } from '@prisma-client';
import {
  NotEnoughBalanceException,
  VoucherAlreadyExistsException,
  VoucherNotFoundException,
} from 'src/exceptions';
import { PrismaService } from 'src/prisma.service';
import {
  ApplyFiltersOnArray,
  AuthorizationDecodedUser,
  generateFiltersOfArgs,
  KafkaMessageHandler,
  KAFKA_MESSAGES,
  KAFKA_SERVICE_TOKEN,
} from 'nest-utils';
import { ClientKafka } from '@nestjs/microservices';
import {
  GetCurrencyExchangeRateMessage,
  GetCurrencyExchangeRateMessageReply,
  GetUserCashbackBalanceMessage,
  GetUserCashbackBalanceMessageReply,
} from 'nest-dto';

@Injectable()
export class VouchersManagementService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(KAFKA_SERVICE_TOKEN) private readonly eventsClient: ClientKafka,
  ) {}

  async createVoucherCluster(
    ownerId: string,
    shopId: string,
  ): Promise<VoucherCluster> {
    if (typeof ownerId !== 'string' || typeof shopId !== 'string')
      throw new BadRequestException(
        'please provide valid owner id and shop id',
      );
    return this.prisma.voucherCluster.create({
      data: {
        ownerId,
      },
    });
  }

  async getMyVouchers(
    { id, shopId }: AuthorizationDecodedUser,
    filters?: GetVouchersInput,
  ): Promise<Voucher[]> {
    const genfilters = generateFiltersOfArgs(filters, ['status']);
    const cluster = await this.prisma.voucherCluster.findUnique({
      where: {
        ownerId: id,
      },
    });
    if (!cluster) {
      const cluster = await this.createVoucherCluster(id, shopId);
      return [];
    }
    return ApplyFiltersOnArray<Voucher>(cluster.vouchersList, genfilters);
  }

  async getVouchersByOwnerId(
    ownerId: string,
    filters?: GetVouchersInput,
  ): Promise<Voucher[]> {
    const genFilters = generateFiltersOfArgs(filters, ['status']);
    const cluster = await this.prisma.voucherCluster.findUnique({
      where: {
        ownerId,
      },
      rejectOnNotFound(error) {
        throw new VoucherNotFoundException('seller id');
      },
    });

    return ApplyFiltersOnArray<Voucher>(cluster.vouchersList, genFilters);
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
    const { code, amount, currency } = input;
    const [exists, voucherIdx] = await this.VoucherExists(userId, code);

    if (exists) throw new VoucherAlreadyExistsException('code');

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

    if (!success)
      throw new InternalServerErrorException(
        'something went worng durning balance check, please try again later',
      );

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
        baseCurrencyCode: 'usd',
        targetCurrencyCode: currency,
      }),
    );

    if (!currencySuccess)
      throw new InternalServerErrorException(
        'something went worng during currency converting process, please try again later',
      );

    const { rate } = currencyData;

    const convertedAmount = amount * rate;
    console.log('convertedAmount', convertedAmount);

    if (convertedAmount > cashbackBalance)
      throw new NotEnoughBalanceException();

    const newVoucher: Voucher = { ...input, status: 'active' };

    await this.prisma.voucherCluster.update({
      where: {
        ownerId: userId,
      },
      data: {
        vouchersList: {
          push: newVoucher,
        },
      },
    });

    return newVoucher;
  }

  async VoucherExists(
    sellerId: string,
    voucherCode: string,
  ): Promise<[boolean, number]> {
    const vouchers = await this.getVouchersByOwnerId(sellerId);

    const voucherIdx = vouchers.findIndex((v) => v.code === voucherCode);

    const voucherExists = voucherIdx > -1;
    return [voucherExists, voucherIdx];
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
    try {
      const { vouchersList } = await this.prisma.voucherCluster.update({
        where: {
          ownerId: sellerId,
        },
        data: {
          vouchersList: {
            updateMany: {
              where: {
                code: voucherCode,
              },
              data: {
                status,
              },
            },
          },
        },
      });
      const voucher = vouchersList.find((v) => v.code === voucherCode);
      if (!voucher) throw new VoucherNotFoundException('code');
      return voucher;
    } catch {
      throw new VoucherNotFoundException();
    }
  }

  async deleteVoucher(
    ownerId: string,
    input: DeleteVoucherInput,
  ): Promise<boolean> {
    try {
      const voucherCluster = await this.prisma.voucherCluster.update({
        where: {
          ownerId,
        },
        data: {
          vouchersList: {
            deleteMany: {
              where: {
                code: input.voucherCode,
              },
            },
          },
        },
      });
      return true;
    } catch {
      throw new VoucherNotFoundException();
    }
  }
}
