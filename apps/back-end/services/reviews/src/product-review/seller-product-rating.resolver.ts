import { UseGuards } from '@nestjs/common';
import { Field, Query, Resolver } from '@nestjs/graphql';
import {
  accountType,
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import { PrismaService } from '../Prisma.service';
import { SellerProductsRating } from './entities';

@Resolver(() => SellerProductsRating)
export class SellerProductsRatingResolver {
  constructor(private readonly prisma: PrismaService) {}
  @Query(() => SellerProductsRating)
  @UseGuards(new GqlAuthorizationGuard([accountType.SELLER]))
  async getMySellerProductsRating(
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ): Promise<SellerProductsRating> {
    const res = await this.prisma.sellerProductsRating.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!res) {
      return await this.prisma.sellerProductsRating.create({
        data: {
          id: user.id,
        },
      });
    }

    return res;
  }
}
