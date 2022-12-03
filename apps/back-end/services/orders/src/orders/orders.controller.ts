import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { EventPattern, Payload } from '@nestjs/microservices';
import { KAFKA_EVENTS } from 'nest-utils';

import { CreateOrderCommand } from '@orders/commands';
import { OrderItemType } from '@orders/const';
import { SellerProductsPurchasedEvent } from 'nest-dto';

@Controller()
export class OrdersController {
  constructor(private readonly commandbus: CommandBus) {}

  @EventPattern(
    KAFKA_EVENTS.BILLING_EVNETS.sellerProductsPurchased(OrderItemType.product),
  )
  async handleSellerProductPurchased(
    @Payload() { value }: { value: SellerProductsPurchasedEvent },
  ) {
    this.commandbus.execute<CreateOrderCommand>(
      new CreateOrderCommand(
        value.input.buyerId,
        value.input.sellerId,
        value.input.products.map((v) => ({
          id: v.id,
          qty: v.qty,
          type: OrderItemType.product,
        })),
        value.input.shippingMethodId,
      ),
    );
  }

  @EventPattern(
    KAFKA_EVENTS.BILLING_EVNETS.sellerProductsPurchased(OrderItemType.service),
  )
  async handleSellerServicePurchased(
    @Payload() { value }: { value: SellerProductsPurchasedEvent },
  ) {
    this.commandbus.execute<CreateOrderCommand>(
      new CreateOrderCommand(
        value.input.buyerId,
        value.input.sellerId,
        value.input.products.map((v) => ({
          id: v.id,
          qty: v.qty,
          type: OrderItemType.service,
        })),
        value.input.shippingMethodId,
      ),
    );
  }
}
