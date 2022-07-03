import { VoucherCluster } from '@entities';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class VouchersManagementService {
  constructor(private readonly prisma: PrismaService) {}

  async getMyVouchers(sellerId: string): Promise<VoucherCluster> {
    return this.prisma.voucherCluster.findUnique({
      where: {
        ownerId: sellerId,
      },
    });
  }
}
