import { Resolver } from '@nestjs/graphql';
import { PrismaService } from 'prismaService';
import { ReturnedOrder } from './entities/returned-order.entity';

@Resolver(() => ReturnedOrder)
export class ReturnedOrdersResolver {
  constructor(private readonly prisma: PrismaService) {}
}
