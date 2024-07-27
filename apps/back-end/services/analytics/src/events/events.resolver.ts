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
  constructor(private readonly prisma: PrismaService) { }

  @Query(() => [Event])
  async adminGetEvents(@Args('args') args: AdminGetEventsInput) {
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
    return parent.causedById
      ? {
        __typename: 'Account',
        id: parent.causedById,
      }
      : null;
  }

  @ResolveField(() => Account, { nullable: true })
  causedTo(@Parent() parent: Event) {
    if (this.isAccountEvent(parent.key as AnalyticsEvents)) {
      return {
        __typename: 'Account',
        id: parent.causedToId,
      };
    }
    return null;
  }

  @ResolveField(() => Order, { nullable: true })
  order(@Parent() parent: Event) {
    if (this.isOrderEvent(parent.key as AnalyticsEvents)) {
      return {
        __typename: 'Order',
        id: parent.causedToId,
      };
    }
    return null;
  }

  private isAccountEvent(key: AnalyticsEvents): boolean {
    return [
      AnalyticsEvents.buyerCreated,
      AnalyticsEvents.buyerDeleted,
      AnalyticsEvents.sellerCreated,
      AnalyticsEvents.sellerDeleted,
    ].includes(key);
  }

  private isOrderEvent(key: AnalyticsEvents): boolean {
    return [
      AnalyticsEvents.orderCreated,
      AnalyticsEvents.orderDeleted,
    ].includes(key);
  }
}
