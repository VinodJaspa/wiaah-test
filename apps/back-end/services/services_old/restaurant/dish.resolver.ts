import { Resolver, ResolveReference } from '@nestjs/graphql';
import { PrismaService } from 'prismaService';
import { Dish } from './entities';

@Resolver(() => Dish)
export class DishResolver {
  constructor(private prisma: PrismaService) {}

  @ResolveReference()
  resloveRef(ref: { __typename: string; id: string }) {
    return this.prisma.restaurantDish.findUnique({
      where: {
        id: ref.id,
      },
    });
  }
}
