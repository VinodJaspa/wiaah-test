import { Injectable } from '@nestjs/common';
import { AskForRefundInput } from '@refund/dto';
import { PrismaService } from 'prismaService';

@Injectable()
export class RefundRepository {
  constructor(private readonly prisma: PrismaService) {}

  createOne(input: AskForRefundInput, userId: string) {
    return this.prisma.refundRequest.create({
      data: {
        orderId: input.id,
        ...input,
        requestedById: userId,
      },
    });
  }
}
