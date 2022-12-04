import { Injectable } from '@nestjs/common';
import { ProfileStatus } from 'prismaClient';
import { PrismaService } from 'prismaService';

@Injectable()
export class ProfileRepository {
  constructor(private readonly prisma: PrismaService) {}

  updateOneStatus(id: string, status: ProfileStatus) {
    return this.prisma.profile.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  }
}
