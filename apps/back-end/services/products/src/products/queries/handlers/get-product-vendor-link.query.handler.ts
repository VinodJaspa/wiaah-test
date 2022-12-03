import { UnprocessableEntityException } from '@nestjs/common';
import { EventBus, IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import { BuyerToProductActions } from '@products/const';
import { Product } from '@products/entities';
import { VendorExternalLinkClickedEvent } from '@products/events';
import {
  GetCanPreformBuyerToProductActionQuery,
  GetProductVendorLinkQuery,
} from '@products/queries/impl';

@QueryHandler(GetProductVendorLinkQuery)
export class GetProductVendorLinkQueryHandler
  implements IQueryHandler<GetProductVendorLinkQuery>
{
  constructor(
    private readonly querybus: QueryBus,
    private readonly eventbus: EventBus,
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
