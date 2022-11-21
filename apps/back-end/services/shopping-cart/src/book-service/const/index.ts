import { ServiceStatus } from '@prisma-client';

export const bookedServiceStatus: Record<ServiceStatus, ServiceStatus> = {
  canceled: 'canceled',
  completed: 'completed',
  continuing: 'continuing',
  pending: 'pending',
  restitute: 'restitute',
};
