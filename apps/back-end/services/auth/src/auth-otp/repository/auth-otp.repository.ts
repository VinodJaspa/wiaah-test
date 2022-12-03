import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prismaService';

@Injectable()
export class AuthOtpRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(email: string, code: string, expiresAt: Date) {
    return this.prisma.authOTP.create({
      data: {
        code,
        email,
        expiresAt,
      },
    });
  }

  getOne(email: string) {
    return this.prisma.authOTP.findUnique({
      where: {
        email,
      },
    });
  }
}
