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
        compeleted: true,
      },
    });
  }

  getAllCompleted() {
    return this.prisma.userAccountVerificationRequest.findMany({
      where: {
        compeleted: true,
      },
    });
  }
}
