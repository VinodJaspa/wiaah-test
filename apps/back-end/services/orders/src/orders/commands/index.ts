export * from './impl';
import {
  AcceptOrderCommandHandler,
  CreateOrderCommandHandler,
  RejectOrderCommandHandler,
} from './handlers';

export const OrdersCommandHandlers = [
  AcceptOrderCommandHandler,
  CreateOrderCommandHandler,
  RejectOrderCommandHandler,
];
