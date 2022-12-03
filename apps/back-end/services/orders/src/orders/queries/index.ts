export * from './impl';
import {
  GetBuyerOrdersQueryHandler,
  GetSellerOrdersQueryHandler,
  GetSellerReturnedOrdersQueryHandler,
  GetIsOrderBuyerQueryHandler,
  GetOrderByIdQueryHandler,
} from './handlers';

export const OrdersQueryHandlers = [
  GetBuyerOrdersQueryHandler,
  GetSellerOrdersQueryHandler,
  GetSellerReturnedOrdersQueryHandler,
  GetIsOrderBuyerQueryHandler,
  GetOrderByIdQueryHandler,
];
