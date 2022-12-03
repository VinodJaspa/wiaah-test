import { Injectable } from '@nestjs/common';
import { ServiceStatus } from '@prisma-client';
import { PrismaService } from 'prismaService';

@Injectable()
export class BookingRepository {
  constructor(private readonly prisma: PrismaService) {}

  getAllBySellerIdAndStatus(sellerId: string, status: ServiceStatus[]) {
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

  updateStatus(id: string, status: ServiceStatus, rejectReason?: string) {
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

  updatePurchaseStatus(id:string,status:boolean){
    return this.prisma.bookedService.update({
      where:{
        id
      },
      data:{
        purchased:status
      }
    })
  }
}
