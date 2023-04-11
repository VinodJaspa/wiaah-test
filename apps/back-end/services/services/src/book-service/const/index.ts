import { BookedServiceStatus } from 'prismaClient';

export const bookedServiceStatus: Record<
  BookedServiceStatus,
  BookedServiceStatus
> = {
  canceled_by_buyer: 'canceled_by_buyer',
  completed: 'completed',
  continuing: 'continuing',
  pending: 'pending',
  restitute: 'restitute',
  paid: 'paid',
};
