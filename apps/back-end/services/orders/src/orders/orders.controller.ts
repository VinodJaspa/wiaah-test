import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { KAFKA_EVENTS } from 'nest-utils';
import { CreateOrderCommand } from '@orders/commands';
import { OrderItemType } from '@orders/const';
import {
  OrderCreatedEvent as OrderCreatedKafkaEvent,
  SellerProductsPurchasedEvent,
} from 'nest-dto';
import { BaseController } from '@orders/abstraction';
import { OrderCreatedEvent } from '@orders/events';

@Controller()
export class OrdersController extends BaseController {
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
        value.input.shippingAddressId,
      ),
    );
  }

  @EventPattern(
    KAFKA_EVENTS.BILLING_EVNETS.sellerProductsPurchased(OrderItemType.service),
  )
  async handleSellerServicePurchased(
    @Payload() { value }: { value: SellerProductsPurchasedEvent },
  ) {
    const order = await this.commandbus.execute<CreateOrderCommand>(
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

    this.eventbus.publish(new OrderCreatedEvent(order, value.input.payment));
  }
}
