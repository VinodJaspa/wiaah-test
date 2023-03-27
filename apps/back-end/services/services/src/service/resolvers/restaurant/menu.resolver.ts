import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { RestaurantMenu } from '@restaurant';
import { PrismaService } from 'prismaService';
import { Service } from '../../entities/service.entity';

@Resolver(() => RestaurantMenu)
export class RestaurantMenuResolver {
  constructor(private readonly prisma: PrismaService) {}

  @ResolveField(() => Service)
  restaurant(@Parent() menu: RestaurantMenu) {
    return this.prisma.service.findUnique({
      where: {
        id: menu.restaurantId,
      },
    });
  }
}
