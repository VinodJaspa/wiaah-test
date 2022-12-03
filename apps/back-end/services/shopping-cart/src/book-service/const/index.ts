import { ServiceStatus } from '@prisma-client';

export const bookedServiceStatus: Record<ServiceStatus, ServiceStatus> = {
  canceled_by_seller: 'canceled_by_seller',
  canceled_by_buyer: 'canceled_by_buyer',
  completed: 'completed',
  continuing: 'continuing',
  pending: 'pending',
  restitute: 'restitute',
};
