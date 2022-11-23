export * from './impl';
import {
  GetBuyerOrdersQueryHandler,
  GetSellerOrdersQueryHandler,
  GetSellerReturnedOrdersQueryHandler,
  GetIsOrderBuyerQueryHandler,
} from './handlers';

export const OrdersQueryHandlers = [
  GetBuyerOrdersQueryHandler,
  GetSellerOrdersQueryHandler,
  GetSellerReturnedOrdersQueryHandler,
  GetIsOrderBuyerQueryHandler,
];
