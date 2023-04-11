import { Injectable } from '@nestjs/common';
import { BookedServiceStatus } from 'prismaClient';
import { PrismaService } from 'prismaService';

@Injectable()
export class BookingRepository {
  constructor(private readonly prisma: PrismaService) {}

  getAllBySellerIdAndStatus(sellerId: string, status: BookedServiceStatus[]) {
    return this.prisma.bookedService.findMany({
      where: {
        AND: [
          {
            providerId: sellerId,
          },
          {
            status: {
              in: status,
            },
          },
        ],
      },
    });
  }

  getOneById(id: string) {
    return this.prisma.bookedService.findUnique({
      where: {
        id,
      },
    });
  }

  updateStatus(id: string, status: BookedServiceStatus, rejectReason?: string) {
    return this.prisma.bookedService.update({
      data: {
        status,
        rejectReason,
      },
      where: {
        id,
      },
    });
  }

  updatePurchaseStatus(id: string, status: boolean) {
    return this.prisma.bookedService.update({
      where: {
        id,
      },
      data: {
        purchased: status,
      },
    });
  }
}
