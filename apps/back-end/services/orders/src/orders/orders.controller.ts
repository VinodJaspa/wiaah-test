import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { KAFKA_EVENTS } from 'nest-utils';
import { CreateOrderCommand } from '@orders/commands';
import { OrderItemType } from '@orders/const';
import {
  OrderItemBillingReadyEvent,
  OrderItemRefundablePeriodOverEvent,
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
          affiliationId: v.affiliation.affiliatorId,
          discountId: v.discount.discountId,
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
          affiliationId: v.affiliation.affiliatorId,
          discountId: v.discount.discountId,
        })),
        value.input.shippingMethodId,
        value.input.shippingAddressId,
      ),
    );

    this.eventbus.publish(new OrderCreatedEvent(order, value.input.payment));
  }

  @EventPattern(KAFKA_EVENTS.ORDERS_EVENTS.orderItemRefundPeriodOver())
  async handleUpdateRefundableItem(
    @Payload() { value }: { value: OrderItemRefundablePeriodOverEvent },
  ) {
    const res = await this.prisma.orderItem.update({
      where: {
        id: value.input.itemId,
      },
      data: {
        refundable: false,
      },
      include: {
        Order: true,
      },
    });

    this.eventClient.emit(
      KAFKA_EVENTS.ORDERS_EVENTS.orderItemBillingReady(),
      new OrderItemBillingReadyEvent({
        itemId: res.id,
        affiliatorId: res.affiliationId,
        cashbackId: res.cashbackId,
        discountId: res.discountId,
        buyerId: res.Order.buyerId,
        sellerId: res.Order.sellerId,
        paidPrice: res.paid,
      }),
    );
  }
}
