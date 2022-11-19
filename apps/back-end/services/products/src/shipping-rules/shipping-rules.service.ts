import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prismaService';

import {
  ShippingRuleNotFoundException,
  ShippingRuleUnAuthorizedException,
} from '@shipping-rules/exceptions';
import { ShippingRule } from '@shipping-rules/entities';
import {
  CreateShippingRuleInput,
  UpdateShippingRuleInput,
} from '@shipping-rules/dto';

@Injectable()
export class ShippingRulesService {
  constructor(private readonly prisma: PrismaService) {}

  getShippingRuleById(id: string): Promise<ShippingRule> {
    return this.prisma.shippingRule.findUnique({
      where: {
        id,
      },
      rejectOnNotFound: () => {
        throw new ShippingRuleNotFoundException('id');
      },
    });
  }

  getShippingRulesByIds(ids: string[] = []): Promise<ShippingRule[]> {
    return this.prisma.shippingRule.findMany({
      where: {
        AND: [
          {
            id: {
              in: ids,
            },
          },
        ],
      },
      take: ids.length,
    });
  }

  async addShippingRule(
    userId: string,
    rule: CreateShippingRuleInput,
  ): Promise<ShippingRule> {
    return this.prisma.shippingRule.create({
      data: {
        ...rule,
        sellerId: userId,
      },
    });
  }

  async updateShippingRule(
    accountId: string,
    updateInput: UpdateShippingRuleInput,
  ): Promise<ShippingRule> {
    const settingsRule = await this.prisma.shippingRule.findUnique({
      where: {
        id: updateInput.id,
      },
      rejectOnNotFound(error) {
        throw new ShippingRuleNotFoundException('id');
      },
    });

    if (settingsRule.sellerId !== accountId)
      throw new ShippingRuleUnAuthorizedException();

    const { id, ...rest } = updateInput;

    return this.prisma.shippingRule.update({
      where: {
        id,
      },
      data: rest,
    });
  }

  async deleteShippingRule(accountId: string, shippingRuleId: string) {
    const shippingRule = await this.prisma.shippingRule.findUnique({
      where: {
        id: shippingRuleId,
      },
      rejectOnNotFound: () => {
        throw new ShippingRuleNotFoundException('id');
      },
    });

    if (accountId !== shippingRule.sellerId)
      throw new ShippingRuleUnAuthorizedException();

    const deleted = await this.prisma.shippingRule.delete({
      where: {
        id: shippingRuleId,
      },
    });

    return deleted;
  }
}
