import { CreateAccountVerificationInput } from '@acc-verification/dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prismaService';

@Injectable()
export class AccountVerificationRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(input: CreateAccountVerificationInput, userId: string) {
    return this.prisma.userAccountVerificationRequest.create({
      data: {
        ...input,
        userId,
        status: 'pending',
      },
    });
  }

  getAllCompleted() {
    return this.prisma.userAccountVerificationRequest.findMany({
      where: {
        status: 'accepted',
      },
    });
  }
}
