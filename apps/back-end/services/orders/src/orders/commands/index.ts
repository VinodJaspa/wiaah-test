export * from './impl';
import {
  AcceptOrderCommandHandler,
  CreateOrderCommandHandler,
  RejectOrderCommandHandler,
  RejectRecivedOrderCommandHandler,
  AcceptReceivedOrderCommandHandler,
} from './handlers';

export const OrdersCommandHandlers = [
  AcceptOrderCommandHandler,
  CreateOrderCommandHandler,
  RejectOrderCommandHandler,
  RejectRecivedOrderCommandHandler,
  AcceptReceivedOrderCommandHandler,
];
