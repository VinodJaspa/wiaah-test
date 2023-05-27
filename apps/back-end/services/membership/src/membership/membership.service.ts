import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prismaService';

@Injectable()
export class MembershipService {
  constructor(private readonly prisma: PrismaService) {}

  async isPayPerClick(userId: string): Promise<boolean> {
    return true;
  }
}
