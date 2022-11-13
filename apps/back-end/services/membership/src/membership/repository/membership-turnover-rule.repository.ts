import { Injectable } from '@nestjs/common';
import { Prisma } from 'prismaClient';
import { PrismaService } from 'prismaService';

@Injectable()
export class MembershipTurnoverRuleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async update(id: string, input: Prisma.MembershipTurnoverRuleUpdateInput) {
    console.log('updating', { input }, id);
    const res = await this.prisma.membershipTurnoverRule.update({
      where: {
        id,
      },
      data: input,
    });
    console.log({ res });
    return res;
  }
}
