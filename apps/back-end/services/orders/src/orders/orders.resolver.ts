import {
  Resolver,
  Query,
  Args,
  Mutation,
  ResolveField,
  Parent,
  Int,
} from '@nestjs/graphql';
import {
  Inject,
  OnModuleInit,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  accountType,
  AuthorizationDecodedUser,
  ExtractPagination,
  GqlAuthorizationGuard,
  GqlCurrentUser,
  KAFKA_MESSAGES,
  SERVICES,
} from 'nest-utils';
import { ClientKafka } from '@nestjs/microservices';
import { GetMyOrdersInput } from '@dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Order } from '@orders/entities';
import { GetBuyerOrdersQuery, GetSellerOrdersQuery } from '@orders/queries';
import {
  AcceptReceivedOrderInput,
  AcceptRequestedOrderInput,
  GetRefundableOrdersInput,
  RejectReceivedOrderInput,
  RejectRequestedOrderInput,
} from '@orders/dto';
import {
  AcceptOrderCommand,
  AcceptReceivedOrderCommand,
  RejectOrderCommand,
  RejectReceivedOrderCommand,
} from './commands';
import { GetUserOrders } from '@orders/dto/get-user-orders.input';
import { GetFilteredOrdersInput } from '@dto';
import { PrismaService } from 'prismaService';
import {
  BillingAddress,
  ShippingAddress,
  ShippingRule,
} from './entities/extends';

@Resolver(() => Order)
export class OrdersResolver implements OnModuleInit {
  constructor(
    @Inject(SERVICES.ORDERS_SERVICE.token)
    private readonly eventsClient: ClientKafka,
    private readonly queryBus: QueryBus,
    private readonly commandbus: CommandBus,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => [Order])
  @UseGuards(new GqlAuthorizationGuard([accountType.BUYER, accountType.SELLER]))
  getRefundableOrders(
    @Args('args') args: GetRefundableOrdersInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    const { take, skip } = ExtractPagination(args.pagination);
    return this.prisma.order.findMany({
      where: {
        AND: [
          {
            buyerId: user.id,
          },
          {
            status: {
              of: 'compeleted',
            },
          },
        ],
      },
      skip,
      take,
    });
  }

  @Query((type) => [Order])
  @UseGuards(new GqlAuthorizationGuard([accountType.BUYER, accountType.SELLER]))
  getMyOrders(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
    @Args('getMyOrdersArgs') args: GetMyOrdersInput,
  ) {
    if (user.accountType === accountType.BUYER) {
      return this.queryBus.execute<GetBuyerOrdersQuery, Order[]>(
        new GetBuyerOrdersQuery(user.id, args.pagination, args.status),
      );
    } else if (user.accountType === accountType.SELLER) {
      return this.queryBus.execute<GetSellerOrdersQuery, Order[]>(
        new GetSellerOrdersQuery(user.id, args.pagination, args.status),
      );
    }
  }

  @Query(() => Order)
  async getOrder(
    @Args('id') id: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    const res = await this.prisma.order.findUnique({
      where: {
        id,
      },
    });

    if (res.sellerId !== user.id && res.buyerId !== user.id)
      throw new UnauthorizedException();

    return res;
  }

  @Query(() => [Order])
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  getUserOrders(@Args('args') args: GetUserOrders) {
    const type = args.accountType;
    if (type === accountType.BUYER) {
      return this.queryBus.execute<GetBuyerOrdersQuery, Order[]>(
        new GetBuyerOrdersQuery(
          args.userId,
          args.pagination,
          args.status,
          args.q,
        ),
      );
    } else if (type === accountType.SELLER) {
      return this.queryBus.execute<GetSellerOrdersQuery, Order[]>(
        new GetSellerOrdersQuery(
          args.userId,
          args.pagination,
          args.status,
          args.q,
        ),
      );
    }
  }

  @Query(() => [Order])
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  getFilteredOrders(@Args('args') args: GetFilteredOrdersInput) {
    const { skip, take } = ExtractPagination(args.pagination);
    return this.prisma.order.findMany({
      take,
      skip,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([accountType.BUYER, accountType.SELLER]))
  rejectReceivedOrder(
    @Args('args') args: RejectReceivedOrderInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.commandbus.execute<RejectReceivedOrderCommand, boolean>(
      new RejectReceivedOrderCommand(args, user.id),
    );
  }

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([accountType.SELLER]))
  rejectRequestedOrder(
    @Args('args') args: RejectRequestedOrderInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.commandbus.execute<RejectOrderCommand, boolean>(
      new RejectOrderCommand(args.id, user.id),
    );
  }

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([accountType.SELLER]))
  acceptRequestedOrder(
    @Args('args') args: AcceptRequestedOrderInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.commandbus.execute<AcceptOrderCommand, boolean>(
      new AcceptOrderCommand(args.id, user.id),
    );
  }

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([accountType.BUYER, accountType.SELLER]))
  acceptReceivedOrder(
    @Args('args') args: AcceptReceivedOrderInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.commandbus.execute<AcceptReceivedOrderCommand, boolean>(
      new AcceptReceivedOrderCommand(args.id, user.id),
    );
  }

  @Query(() => [Order])
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  getLatestOrders(
    @Args('take', { nullable: true, defaultValue: 10, type: () => Int })
    take: number,
  ) {
    return this.prisma.order.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take,
    });
  }

  @ResolveField(() => BillingAddress)
  billing(@Parent() order: Order) {
    if (order.billingAddressId) {
      return {
        __typename: 'BillingAddress',
        id: order.billingAddressId,
        ownerId: order.buyerId,
      };
    } else return null;
  }

  @ResolveField(() => ShippingRule)
  shipping(@Parent() order: Order) {
    return {
      __typename: 'ShippingMethod',
      id: order.shippingMethodId,
    };
  }

  @ResolveField(() => ShippingAddress)
  shippingAddress(@Parent() order: Order) {
    return {
      __typename: 'ShippingAddress',
      id: order.shippingAddressId,
    };
  }

  async onModuleInit() {
    this.eventsClient.subscribeToResponseOf(
      KAFKA_MESSAGES.PRODUCTS_MESSAGES.getProductsMetaData,
    );
    this.eventsClient.subscribeToResponseOf(
      KAFKA_MESSAGES.ACCOUNTS_MESSAGES.getAccountById,
    );
    await this.eventsClient.connect();
  }
}
