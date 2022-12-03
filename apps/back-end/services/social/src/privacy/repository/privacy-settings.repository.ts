import { Injectable } from '@nestjs/common';
import {
  CreatePrivacySettingsInput,
  UpdateMyPrivacyInput,
} from '@privacy-settings/dto';
import { PrismaService } from 'prismaService';

@Injectable()
export class PrivacySettingsRepository {
  constructor(private readonly prisma: PrismaService) {}

  getOneByUserId(userId: string) {
    return this.prisma.privacySettings.findUnique({
      where: {
        userId,
      },
    });
  }

  create(userId: string) {
    return this.prisma.privacySettings.create({
      data: { userId },
    });
  }

  update(input: UpdateMyPrivacyInput, userId: string) {
    return this.prisma.privacySettings.update({
      where: {
        userId,
      },
      data: input,
    });
  }

  delete(userId: string) {
    return this.prisma.privacySettings.delete({
      where: {
        userId,
      },
    });
  }
}
