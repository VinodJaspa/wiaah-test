import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prismaService';
import { ShippingDetails } from './entities/shipping-details.entity';

@Injectable()
export class ShippingDetailsService {
  constructor(private readonly prisma: PrismaService) {}

  async getShippingDetials(
    shippingRulesIds: string[],
    countryCode: string,
  ): Promise<ShippingDetails> {
    const shippingRules = await this.prisma.shippingRule.findFirst({
      where: {
        AND: [
          {
            id: {
              in: shippingRulesIds,
            },
          },
          {
            countries: {
              some: {
                code: countryCode,
              },
            },
          },
        ],
      },
      take: shippingRulesIds.length,
      orderBy: {
        cost: 'asc',
      },
    });
    if (!shippingRules)
      return {
        available: false,
        cost: null,
        country: countryCode,
        shippingTypes: [],
        deliveryTimeRange: null,
        shippingRulesIds: [],
      };

    const { cost, shippingTypes, deliveryTimeRange } = shippingRules;

    return {
      available: true,
      cost,
      country: countryCode,
      deliveryTimeRange,
      shippingTypes,
      shippingRulesIds: [shippingRules[0].id],
    };
  }
}
