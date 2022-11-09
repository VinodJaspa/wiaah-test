import { Injectable } from '@nestjs/common';
import { generateRandomNumber } from 'nest-utils';
import { PrismaService } from 'prismaService';
import { CreateIdentityVerificationInput } from '../dto';

@Injectable()
export class IdentityVerificationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createRequest(
    input: CreateIdentityVerificationInput,
    userId: string,
  ): Promise<string> {
    const VVC = `${generateRandomNumber(100)}`;
    await this.prisma.userIdenityVerificationRequest.create({
      data: {
        ...input,
        VVC: VVC,
        userId,
      },
    });

    return VVC;
  }

  async provideVVCPicture(pic: string, userId: string): Promise<boolean> {
    const request = await this.prisma.userIdenityVerificationRequest.findUnique(
      {
        where: {
          userId,
        },
      },
    );
    if (!request) return false;

    await this.prisma.userIdenityVerificationRequest.update({
      where: {
        userId,
      },
      data: {
        VVCPicture: pic,
        compeleted: true,
      },
    });

    return true;
  }
}
