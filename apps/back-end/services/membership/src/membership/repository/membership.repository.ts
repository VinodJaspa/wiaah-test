import { Injectable } from '@nestjs/common';
import { Membership, MembershipTurnoverRule, Prisma } from 'prismaClient';
import { PrismaService } from 'prismaService';
import { CreateMembershipInput, UpdateMembershipInput } from '@membership/dto';

@Injectable()
export class MembershipRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    return this.prisma.membership.findUnique({
      where: {
        id,
      },
      include: {
        turnover_rules: true,
      },
    });
  }

  create(
    input: CreateMembershipInput,
    userId: string,
  ): Promise<Membership & { turnover_rules: MembershipTurnoverRule[] }> {
    return this.prisma.membership.create({
      data: {
        ...input,
        turnover_rules: {
          createMany: {
            data: input.turnover_rules,
          },
        },
      },
      include: {
        turnover_rules: true,
      },
    });
  }

  async update(id: string, input: Prisma.MembershipUpdateInput) {
    return this.prisma.membership.update({
      where: {
        id,
      },
      include: {
        turnover_rules: true,
      },
      data: {
        ...input,
        turnover_rules: undefined,
      },
    });
  }

  async findAll() {
    return this.prisma.membership.findMany({
      include: { turnover_rules: true },
    });
  }

  async findAllActive(): Promise<Membership[]> {
    return this.prisma.membership.findMany({
      where: {
        active: true,
      },
    });
  }

  async activeateMembership(id: string): Promise<Membership> {
    return this.prisma.membership.update({
      where: {
        id,
      },
      data: {
        active: true,
      },
    });
  }
}
