import { UnprocessableEntityException } from '@nestjs/common';
import { EventBus, IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import { BuyerToProductActions } from '@products/const';
import { Product } from '@products/entities';
import { VendorExternalLinkClickedEvent } from '@products/events';
import {
  GetCanPreformBuyerToProductActionQuery,
  GetProductVendorLinkQuery,
} from '@products/queries/impl';
import { PrismaService } from 'prismaService';

@QueryHandler(GetProductVendorLinkQuery)
export class GetProductVendorLinkQueryHandler
  implements IQueryHandler<GetProductVendorLinkQuery>
{
  constructor(
    private readonly querybus: QueryBus,
    private readonly eventbus: EventBus,
    private readonly prisma: PrismaService,
  ) {}

  async execute({
    productId,
    user,
  }: GetProductVendorLinkQuery): Promise<string> {
    const canPreformAction = await this.querybus.execute<
      GetCanPreformBuyerToProductActionQuery,
      Product | false
    >(
      new GetCanPreformBuyerToProductActionQuery(
        productId,
        BuyerToProductActions.vendor_external_click,
        user,
      ),
    );
    if (!canPreformAction)
      throw new UnprocessableEntityException('cannot preform this action');

    const todaysClickRecord =
      await this.prisma.productDayExternalClicks.findFirst({
        where: {
          AND: [
            {
              productId,
            },
            {
              createdAt: {
                gte: new Date(
                  new Date().getFullYear(),
                  new Date().getMonth(),
                  new Date().getDate(),
                  0,
                  0,
                  0,
                ),
              },
            },
          ],
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    if (todaysClickRecord) {
      await this.prisma.productDayExternalClicks.update({
        where: {
          id: todaysClickRecord.id,
        },
        data: {
          clicks: {
            increment: 1,
          },
        },
      });
    } else {
      const clicks = await this.prisma.productDayExternalClicks.create({
        data: {
          productId,
          clicks: 1,
        },
      });

      await this.prisma.product.update({
        where: {
          id: productId,
        },
        data: {
          todayProductClickId: clicks.id,
        },
      });
    }

    this.eventbus.publish<VendorExternalLinkClickedEvent>(
      new VendorExternalLinkClickedEvent(
        canPreformAction.id,
        canPreformAction.sellerId,
        user,
      ),
    );
    return canPreformAction.vendor_external_link;
  }
}
