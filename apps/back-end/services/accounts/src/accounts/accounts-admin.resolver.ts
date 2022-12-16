import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  accountType,
  ExtractPagination,
  GqlAuthorizationGuard,
  GqlPaginationInput,
} from 'nest-utils';
import { PrismaService } from 'prismaService';
import { Account } from './entities/account.entity';

@Resolver()
@UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
export class AccountsAdminResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [Account])
  async getPendingSellers(@Args('pagination') pagination: GqlPaginationInput) {
    const { skip, take } = ExtractPagination(pagination);
    const res = await this.prisma.account.findMany({
      where: {
        AND: [
          {
            type: 'seller',
          },
          {
            status: 'pending',
          },
        ],
      },
      take,
      skip,
    });
    return res;
  }

  @Mutation(() => Boolean)
  async acceptSellerAccount(@Args('id') id: string) {
    await this.prisma.account.update({
      where: {
        id,
      },
      data: {
        status: 'active',
      },
    });
  }

  @Mutation(() => Boolean)
  async declineSellerAccount(@Args('id') id: string) {
    await this.prisma.account.update({
      where: {
        id,
      },
      data: {
        status: 'refused',
      },
    });
  }
}
