import { OrderStatusEnum } from '@prisma-client';

export const OrderStatus: Record<OrderStatusEnum, OrderStatusEnum> = {
  compeleted: 'compeleted',
  pending: 'pending',
  rejectedByBuyer: 'rejectedByBuyer',
  rejectedBySeller: 'rejectedBySeller',
  shipping: 'shipping',
};
