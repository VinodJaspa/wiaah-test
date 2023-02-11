import { UnauthorizedException } from '@nestjs/common';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { AuthorizationDecodedUser, GqlCurrentUser } from 'nest-utils';
import { PrismaService } from 'prismaService';
import { CreateShippingAddressInput } from './dto/create-shipping-address.input';
import { UpdateShippingAddressInput } from './dto/update-shipping-address.input';
import { ShippingAddress } from './entities/shipping-address.entity';

@Resolver(() => ShippingAddress)
export class ShippingAddressResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => [ShippingAddress])
  getMyShippingAddress(@GqlCurrentUser() user: AuthorizationDecodedUser) {
    return this.prisma.shippingAddress.findMany({
      where: {
        ownerId: user.id,
      },
    });
  }

  @Mutation(() => Boolean)
  async createShippingAddress(
    @Args('args') args: CreateShippingAddressInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    try {
      const res = await this.prisma.shippingAddress.create({
        data: { ...args, ownerId: user.id },
      });
    } catch (error) {
      console.log({ error });

      return false;
    }
  }

  @Mutation(() => Boolean)
  async updateShippingAddress(
    @Args('args') args: UpdateShippingAddressInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    try {
      const res = await this.prisma.shippingAddress.findUnique({
        where: {
          id: args.id,
        },
      });

      if (res.ownerId !== user.id)
        throw new UnauthorizedException('You dont own this shipping address');

      const updated = await this.prisma.shippingAddress.update({
        where: {
          id: args.id,
        },
        data: args,
      });

      return !!updated;
    } catch (error) {
      console.log({ error });

      return false;
    }
  }

  @Mutation(() => Boolean)
  async deleteShippingAddress(
    @Args('id') id: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    try {
      const res = await this.prisma.shippingAddress.findUnique({
        where: {
          id,
        },
      });

      if (res.ownerId !== user.id)
        throw new UnauthorizedException('You dont own this shipping address');

      const updated = await this.prisma.shippingAddress.delete({
        where: {
          id,
        },
      });

      return !!updated;
    } catch (error) {
      console.log({ error });

      return false;
    }
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
