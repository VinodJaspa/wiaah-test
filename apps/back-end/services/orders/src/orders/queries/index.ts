export * from './impl';
import {
  GetBuyerOrdersQueryHandler,
  GetSellerOrdersQueryHandler,
} from './handlers';

export const OrdersQueryHandlers = [
  GetBuyerOrdersQueryHandler,
  GetSellerOrdersQueryHandler,
];
