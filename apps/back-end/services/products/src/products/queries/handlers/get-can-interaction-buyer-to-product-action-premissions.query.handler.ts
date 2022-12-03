import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import { ProductsService } from '@products/products.service';
import {
  GetCanPreformBuyerToProductActionQuery,
  GetProductSellerMembershipIdQuery,
} from '@products/queries/impl';
import { Product } from '@products/entities';
import { BuyerToProductActions } from '@products/const';
import { KafkaMessageHandler, KAFKA_MESSAGES, SERVICES } from 'nest-utils';
import {
  CanPreformProductActionMessage,
  CanPreformProductActionMessageReply,
} from 'nest-dto';
import { Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@QueryHandler(GetCanPreformBuyerToProductActionQuery)
export class GetCanPreformBuyerToProductActionQueryHandler
  implements IQueryHandler<GetCanPreformBuyerToProductActionQuery>
{
  constructor(
    @Inject(SERVICES.PRODUCTS_SERVICE.token)
    private readonly eventClient: ClientKafka,
    private readonly productRepo: ProductsService,
    private readonly querybus: QueryBus,
  ) {}

  async execute({
    productId,
    action,
    user,
  }: GetCanPreformBuyerToProductActionQuery): Promise<Product | false> {
    const product = await this.productRepo.getProductById(productId);
    if (action === BuyerToProductActions.vendor_external_click) {
      const sellerMembershipId = await this.querybus.execute<
        GetProductSellerMembershipIdQuery,
        string
      >(new GetProductSellerMembershipIdQuery(product.sellerId));

      const {
        results: { data, error, success },
      } = await KafkaMessageHandler<
        string,
        CanPreformProductActionMessage,
        CanPreformProductActionMessageReply
      >(
        this.eventClient,
        KAFKA_MESSAGES.CAN_PREFORM_ACTION_MESSAGES.canPreformProductAction(
          action,
        ),
        new CanPreformProductActionMessage({
          action,
          product: {
            id: product.id,
          },
          seller: {
            id: product.sellerId,
            membershipId: sellerMembershipId,
          },
        }),
      );
      if (!success) return false;
      if (data === false) return false;
    }

    return product;
  }
}
