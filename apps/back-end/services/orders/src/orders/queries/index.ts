export * from './impl';
import {
  GetBuyerOrdersQueryHandler,
  GetSellerOrdersQueryHandler,
  GetSellerReturnedOrdersQueryHandler,
  GetIsOrderBuyerQueryHandler,
  GetOrderByIdQueryHandler,
  GetProductsDataQueryHandler,
  GetShippingAddressCommandHandler,
  GetShippingMethodQueryHandler,
  GetUserDataQueryHandler,
} from './handlers';

export const OrdersQueryHandlers = [
  GetBuyerOrdersQueryHandler,
  GetSellerOrdersQueryHandler,
  GetSellerReturnedOrdersQueryHandler,
  GetIsOrderBuyerQueryHandler,
  GetOrderByIdQueryHandler,
  GetProductsDataQueryHandler,
  GetShippingAddressCommandHandler,
  GetShippingMethodQueryHandler,
  GetUserDataQueryHandler,
];
