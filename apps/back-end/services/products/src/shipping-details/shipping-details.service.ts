import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prismaService';
import { ShippingRulesService } from '@shipping-rules';
import { ShippingDetails } from './entities/shipping-detail.entity';

@Injectable()
export class ShippingDetailsService {
  constructor(
    private readonly ShippingRulesService: ShippingRulesService,
    private readonly prisma: PrismaService,
  ) {}

  async getShippingDetials(
    shippingRulesIds: string[],
    country: string,
  ): Promise<ShippingDetails> {
    const shippingRules = await this.prisma.shippingRule.findMany({
      where: {
        AND: {
          id: {
            in: shippingRulesIds,
          },
          countries: {
            every: {
              code: '',
            },
          },
        },
      },
      take: shippingRulesIds.length,
      orderBy: {
        createdAt: 'desc',
      },
    });
    if (shippingRules.length < 1)
      return {
        available: false,
        cost: null,
        country,
        shippingTypes: [],
        deliveryTimeRange: null,
        shippingRulesIds: [],
      };

    const { cost, shippingTypes, deliveryTimeRange } = shippingRules[0];

    return {
      available: true,
      cost,
      country,
      deliveryTimeRange,
      shippingTypes,
      shippingRulesIds: [shippingRules[0].id],
    };
  }
}
