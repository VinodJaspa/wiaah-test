export * from './impl';
import { GetOrderQueryHandler, GetRefundRequestQueryHandler } from './handlers';

export const RefundQueryHandler = [
  GetOrderQueryHandler,
  GetRefundRequestQueryHandler,
];
