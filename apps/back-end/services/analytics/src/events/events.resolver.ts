import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Event } from './entities/event.entity';
import { PrismaService } from 'prismaService';
import { AdminGetEventsInput } from './dto/admin-get-activity.input';
import { ExtractPagination } from 'nest-utils';
import { Account } from './entities/account.entitiy';
import { AnalyticsEvents } from './const';
import { Order } from './entities/order.entity.extends';

@Resolver(() => Event)
export class EventsResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => Event)
  adminGetEvents(@Args('args') args: AdminGetEventsInput) {
    const { skip, take } = ExtractPagination(args.pagination);
    return this.prisma.event.findMany({
      where: {
        key: args.event,
      },
      skip,
      take,
    });
  }

  @ResolveField(() => Account, { nullable: true })
  causedBy(@Parent() parent: Event) {
    if (parent.causedToId) {
      return {
        __typename: 'Account',
        id: parent.causedById,
      };
    } else return null;
  }
  @ResolveField(() => Account, { nullable: true })
  causedTo(@Parent() parent: Event) {
    if (
      parent.key === AnalyticsEvents.buyerCreated ||
      parent.key === AnalyticsEvents.buyerDeleted ||
      parent.key === AnalyticsEvents.sellerCreated ||
      parent.key === AnalyticsEvents.sellerDeleted
    ) {
      return {
        __typename: 'Account',
        id: parent.causedToId,
      };
    } else return null;
  }

  @ResolveField(() => Order, { nullable: true })
  order(@Parent() parent: Event) {
    if (
      parent.key === AnalyticsEvents.orderCreated ||
      parent.key === AnalyticsEvents.orderDeleted
    ) {
      return {
        __typename: 'Order',
        id: parent.causedToId,
      };
    } else return null;
  }
}
