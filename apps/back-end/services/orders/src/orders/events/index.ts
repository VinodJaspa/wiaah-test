export * from './impl';
import {
  OrderCreatedKafkaEventHandler,
  OrderStatusUpdatedEventHandler,
} from './handler';

export const OrdersEventHandlers = [
  OrderCreatedKafkaEventHandler,
  OrderStatusUpdatedEventHandler,
];
