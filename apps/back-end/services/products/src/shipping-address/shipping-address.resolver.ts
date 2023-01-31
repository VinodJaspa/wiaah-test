import { Query, Resolver, ResolveReference } from '@nestjs/graphql';
import { PrismaService } from 'prismaService';
import { ShippingAddress } from './entities/shipping-address.entity';

@Resolver(() => ShippingAddress)
export class ShippingAddressResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => [ShippingAddress])
  getMyShippingAddress() {
    return [];
  }

  @ResolveReference()
  ref(ref: { __typename: string; id: string }) {
    return this.prisma.shippingAddress.findUnique({
      where: {
        id: ref.id,
      },
    });
  }
}
