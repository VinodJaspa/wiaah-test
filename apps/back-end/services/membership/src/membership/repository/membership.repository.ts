import { Injectable } from '@nestjs/common';
import {
  Membership,
  MembershipTurnoverRule,
  MembershipTurnoverRuleType,
  Prisma,
} from 'prismaClient';
import { PrismaService } from 'prismaService';
import { CreateMembershipInput, UpdateMembershipInput } from '@membership/dto';
import { StripeService } from 'nest-utils';

@Injectable()
export class MembershipRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly stripe: StripeService,
  ) {}

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

  async create(
    input: CreateMembershipInput,
    userId: string,
  ): Promise<Membership & { turnover_rules: MembershipTurnoverRule[] }> {
    const prod = await this.stripe.createStripeProduct(input.name);

    const flatRules = input.turnover_rules.filter(
      (v) => v.type === MembershipTurnoverRuleType.flat,
    );
    const tieredRules = input.turnover_rules.filter(
      (v) => v.type === MembershipTurnoverRuleType.usage,
    );

    const flatPrices = await Promise.all(
      flatRules.map(async (v) => {
        console.log('flat', v);
        const price = await this.stripe.createPrice({
          unit_amount_decimal: String(v.commission.toPrecision(10)),
          product: prod.id,
          currency: 'usd',
          nickname: prod.name,
          recurring: {
            interval: input.recurring,
          },
        });
        return price.id;
      }),
    );

    const tierdPrice =
      tieredRules.length > 0
        ? await this.stripe.createPrice({
            product: prod.id,
            tiers_mode: 'graduated',
            recurring: {
              interval: input.recurring,
              usage_type: 'metered',
            },
            tiers: tieredRules.map((v, i) => ({
              up_to: v.usage,
              unit_amount: v.commission,
            })),
            currency: 'usd',
          })
        : null;

    return this.prisma.membership.create({
      data: {
        ...input,
        priceIds: flatPrices.concat(tierdPrice?.id ? [tierdPrice.id] : []),
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
