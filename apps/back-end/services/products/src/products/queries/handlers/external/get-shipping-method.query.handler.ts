import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  GetShippingMethodQuery,
  ShippingMethodQueryRes,
} from '@products/queries/impl';
import { PrismaService } from 'prismaService';

@QueryHandler(GetShippingMethodQuery)
export class GetShippingMethodQueryHandler
  implements IQueryHandler<GetShippingMethodQuery>
{
  constructor(private readonly prisma: PrismaService) {}

  async execute({
    id,
  }: GetShippingMethodQuery): Promise<ShippingMethodQueryRes> {
    const rule = await this.prisma.shippingRule.findUnique({
      where: {
        id,
      },
    });
    return { cost: rule.cost, name: rule.name };
  }
}
