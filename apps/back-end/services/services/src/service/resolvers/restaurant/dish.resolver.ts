import { UseGuards } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Dish, RestaurantMenu } from '@restaurant';
import { AdminGetDishsInput } from '@service/dto/admin-get-dishs.input';
import {
  accountType,
  ExtractPagination,
  GqlAuthorizationGuard,
} from 'nest-utils';
import { Prisma } from 'prismaClient';
import { PrismaService } from 'prismaService';

@Resolver(() => Dish)
export class RestaurantDishResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => [Dish])
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  adminGetDishs(@Args('args') args: AdminGetDishsInput) {
    const filters: Prisma.RestaurantDishWhereInput[] = [];
    const { skip, take } = ExtractPagination(args.pagination);

    if (args.name) {
      filters.push({
        name: {
          some: {
            value: {
              contains: args.name,
            },
          },
        },
      });
    }

    if (args.type) {
      filters.push({
        type: args.type,
      });
    }
    if (args.sales) {
      filters.push({
        sales: {
          equals: args.sales,
        },
      });
    }

    return this.prisma.restaurantDish.findMany({
      where: {
        AND: filters,
      },
      include: {
        menu: {
          include: {
            restaurant: true,
          },
        },
      },
      skip,
      take,
    });
  }

  @ResolveField(() => RestaurantMenu)
  menu(@Parent() dish: Dish) {
    return this.prisma.restaurantMenu.findUnique({
      where: {
        id: dish.menuId,
      },
    });
  }
}
