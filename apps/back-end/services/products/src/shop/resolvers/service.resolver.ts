import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Shop } from '@shop/entities';
import { Service } from '@shop/entities/extends/service.extends.entity';
import { PrismaService } from 'prismaService';

@Resolver(() => Service)
export class ServiceResolver {
  constructor(private readonly prisma: PrismaService) {}

  @ResolveField(() => Shop)
  shop(@Parent() service: Service) {
    return this.prisma.shop.findUnique({
      where: {
        ownerId: service.sellerId,
      },
    });
  }
}
