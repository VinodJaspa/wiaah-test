import { Resolver, ResolveReference } from '@nestjs/graphql';
import { ShippingDetails } from '@shipping-rules/entities';
import { PrismaService } from 'prismaService';

@Resolver(() => ShippingDetails)
export class ShippingDetailsResolver {
  constructor(private readonly prisma: PrismaService) {}

  @ResolveReference()
  async resolveShippingDetails(ref: {
    __typename: string;
    country: string;
    shippingRulesIds: string[];
  }): Promise<ShippingDetails> {
    if (
      !ref.country ||
      !ref.shippingRulesIds ||
      !Array.isArray(ref.shippingRulesIds)
    )
      return null;
    const rule = await this.prisma.shippingRule.findFirst({
      orderBy: {
        cost: 'asc',
      },
      where: {
        AND: [
          {
            countries: {
              some: {
                code: ref.country,
              },
            },
          },
          {
            id: {
              in: ref.shippingRulesIds,
            },
          },
        ],
      },
    });

    return {
      available: !!rule,
      cost: rule.cost,
      country: ref.country,
      deliveryTimeRange: rule.deliveryTimeRange,
      shippingRulesIds: [rule.id],
      shippingTypes: rule.shippingTypes,
    };
  }
}
