import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OrderItemType } from '@orders/const';
import { KAFKA_EVENTS } from 'nest-utils';
import { OrderCreatedEvent as OrderCreatedKafkaEvent } from 'nest-dto';
import { OrderCreatedEvent } from '@orders/events/impl';
import { BaseEventHandler } from '@orders/abstraction/base-event-handler';
import {
  GetProductsData,
  GetProductsDataRes,
  GetShippingAddressQuery,
  GetShippingMethodQuery,
  GetUserDataQuery,
  GetUserDataQueryRes,
  ShippingAddressQueryRes,
  ShippingMethodQueryRes,
} from '@orders/queries';

@EventsHandler(OrderCreatedEvent)
export class OrderCreatedKafkaEventHandler
  extends BaseEventHandler
  implements IEventHandler<OrderCreatedEvent>
{
  async handle({ order, payment }: OrderCreatedEvent) {
    const { buyerId, sellerId, shippingAddressId, shippingMethodId } = order;

    const productsPromise = this.querybus.execute<
      GetProductsData,
      GetProductsDataRes
    >(new GetProductsData(order.items.map((v) => v.id)));
    const shippingMethodPromise = this.querybus.execute<
      GetShippingMethodQuery,
      ShippingMethodQueryRes
    >(new GetShippingMethodQuery(shippingMethodId));
    const shippignAddressPromise = this.querybus.execute<
      GetShippingAddressQuery,
      ShippingAddressQueryRes
    >(new GetShippingAddressQuery(shippingAddressId));
    const buyerPromise = this.querybus.execute<
      GetUserDataQuery,
      GetUserDataQueryRes
    >(new GetUserDataQuery(buyerId));
    const sellerPromise = this.querybus.execute<
      GetUserDataQuery,
      GetUserDataQueryRes
    >(new GetUserDataQuery(sellerId));

    const shippingMethod = await shippingMethodPromise;
    const shippingAddress = await shippignAddressPromise;
    const buyer = await buyerPromise;
    const seller = await sellerPromise;
    const _products = await productsPromise;

    if (!_products) return;
    const products = _products
      .map((v) => {
        const item = order.items.find((i) => i.id === v.id);
        if (!item) return null;
        return {
          ...v,
          qty: item.qty,
        };
      })
      .filter((v) => !!v);

    const subtotal = products.reduce((acc, curr) => {
      return acc + curr.price * curr.qty;
    }, 0);

    const taxes = products.reduce((acc, curr) => {
      const itemIdx = order.items.findIndex((v) => v.id === curr.id);
      const orderItem = order.items[itemIdx];
      if (!orderItem) return acc;
      return acc + curr.tax * orderItem.qty;
    }, 0);

    const total = subtotal + taxes + shippingMethod.cost;

    this.eventClient.emit(
      KAFKA_EVENTS.ORDERS_EVENTS.orderCreated(OrderItemType.product),
      new OrderCreatedKafkaEvent({
        buyer: {
          id: buyerId,
          email: buyer.email,
          name: buyer.name,
          currency: buyer.preferedCurrency,
        },
        seller: {
          id: sellerId,
          email: seller.email,
          name: seller.name,
          currency: seller.preferedCurrency,
        },
        order: {
          id: order.id,
          address: shippingAddress.address_full,
          bills: {
            shipping: {
              price: shippingMethod.cost,
              type: shippingMethod.name,
            },
            subtotal,
            tax: taxes,
            total,
          },
          date: new Date(order.createdAt).toISOString(),
          items: products.map((v) => ({
            name: v.title,
            price: v.price,
            qty: v.qty,
            thumbnail: v.thumbnail,
            categories: v.categories,
          })),
          payment: {
            ending_with: payment.value,
            type: payment.type,
          },
        },
      }),
    );
  }
}
