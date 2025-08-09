import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prismaService';

@Injectable()
export class UserAuthSettingsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(accountId: string) {
    return this.prisma.userAuthSettings.create({
      data: {
        accountId,
        twoFactoryAuth: false,
      },
    });
  }
  
  

  getOne(accountId: string) {
    return this.prisma.userAuthSettings.findUnique({
      where: {
        id: accountId,
      },
    });
  }
}
