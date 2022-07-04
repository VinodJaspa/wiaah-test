import { CreateVoucherInput, GetVouchersInput } from '@dto';
import { Voucher, VoucherCluster } from '@entities';
import { BadRequestException, Injectable } from '@nestjs/common';
import { VoucherStatus } from '@prisma-client';
import {
  VoucherAlreadyExistsException,
  VoucherNotFoundException,
} from 'src/exceptions';
import { PrismaService } from 'src/prisma.service';
import {
  ApplyFiltersOnArray,
  AuthorizationDecodedUser,
  generateFiltersOfArgs,
  hasFilters,
} from 'nest-utils';

@Injectable()
export class VouchersManagementService {
  constructor(private readonly prisma: PrismaService) {}

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
        shopId,
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
    return ApplyFiltersOnArray(cluster.vouchersList, genfilters);
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

    return ApplyFiltersOnArray(cluster.vouchersList, genFilters);
  }

  async getVouchersByShopId(
    shopId: string,
    filters: GetVouchersInput,
  ): Promise<Voucher[]> {
    const genFilters = generateFiltersOfArgs(filters, ['status']);
    const cluster = await this.prisma.voucherCluster.findUnique({
      where: {
        shopId,
      },
      rejectOnNotFound(error) {
        throw new VoucherNotFoundException('shop id');
      },
    });
    return ApplyFiltersOnArray(cluster.vouchersList, genFilters);
  }

  async createVoucher(
    sellerId: string,
    input: CreateVoucherInput,
  ): Promise<Voucher> {
    try {
      const { code, ...rest } = input;
      const [exists, voucherIdx] = await this.VoucherExists(sellerId, code);

      if (exists) throw new VoucherAlreadyExistsException('code');

      const newVoucher: Voucher = {
        code,
        status: 'active',
        ...rest,
      };
      await this.prisma.voucherCluster.update({
        where: {
          ownerId: sellerId,
        },
        data: {
          vouchersList: {
            push: newVoucher,
          },
        },
      });

      return newVoucher;
    } catch {
      throw new VoucherNotFoundException('seller id');
    }
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
      return vouchersList.find((v) => v.code === voucherCode);
    } catch {
      throw new VoucherNotFoundException('seller Id');
    }
  }
}
