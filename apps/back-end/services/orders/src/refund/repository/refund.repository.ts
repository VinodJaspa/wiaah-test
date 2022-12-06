import { Injectable } from '@nestjs/common';
import { RefundStatusType } from '@prisma-client';
import { AskForRefundInput } from '@refund/dto';
import { PrismaService } from 'prismaService';

@Injectable()
export class RefundRepository {
  constructor(private readonly prisma: PrismaService) {}

  getOneById(id: string) {
    return this.prisma.refundRequest.findUnique({
      where: {
        id,
      },
    });
  }

  createOne(input: AskForRefundInput, sellerId: string, userId: string) {
    return this.prisma.refundRequest.create({
      data: {
        orderId: input.id,
        ...input,
        requestedById: userId,
        status: 'pending',
        sellerId,
      },
    });
  }

  updateOneStatus(id: string, status: RefundStatusType, rejectReason?: string) {
    return this.prisma.refundRequest.update({
      data: {
        status,
        rejectReason,
      },
      where: {
        id,
      },
    });
  }
}
