import { OrderStatusEnum } from '@prisma-client';

export const OrderStatus = OrderStatusEnum;
export type OrderStatus = keyof typeof OrderStatus;
