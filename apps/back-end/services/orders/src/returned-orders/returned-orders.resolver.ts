import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { Product } from '@orders/entities/extends';
import {
  AuthorizationDecodedUser,
  ExtractPagination,
  GqlCurrentUser,
} from 'nest-utils';
import { PrismaService } from 'prismaService';
import { GetMyReturnedOrdersInput } from './dto/get-my-returned-orders.input';
import { ReturnedOrder } from './entities/returned-order.entity';

@Resolver(() => ReturnedOrder)
export class ReturnedOrdersResolver {
  constructor(private readonly prisma: PrismaService) {}
}
