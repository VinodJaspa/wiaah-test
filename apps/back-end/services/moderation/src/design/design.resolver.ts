import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Design } from './entities/design.entity';
import { PrismaService } from 'prismaService';
import { UseGuards } from '@nestjs/common';
import {
  accountType,
  ExtractPagination,
  GqlAuthorizationGuard,
} from 'nest-utils';
import { GetDesignByPlacementInput } from './dto/get-design-by-placement.input';
import { UpdateDesignInput } from './dto/update-design.input';
import { AdminGetDesignsInput } from './dto/admin-get-designs';
import { Prisma } from 'prismaClient';

@Resolver(() => Design)
export class DesignResolver {
  constructor(private readonly prisna: PrismaService) {}

  @Query(() => [Design])
  getDesignByPlacement(@Args('args') args: GetDesignByPlacementInput) {
    const { skip, take } = ExtractPagination(args.pagination);
    return this.prisna.design.findMany({
      where: {
        placement: {
          has: args.placement,
        },
      },
      take,
      skip,
    });
  }

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  async UpdateDesign(@Args('args') args: UpdateDesignInput) {
    const { id, ...rest } = args;
    await this.prisna.design.update({
      where: {
        id,
      },
      data: rest,
    });
    return true;
  }

  @Query(() => [Design])
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  async adminGetDesigns(@Args('args') args: AdminGetDesignsInput) {
    const filters: Prisma.DesignWhereInput[] = [];

    const { take, skip } = ExtractPagination(args.pagination);

    if (args.name) {
      filters.push({
        name: {
          contains: args.name,
        },
      });
    }

    if (args.placement) {
      filters.push({
        placement: {
          hasSome: args.placement,
        },
      });
    }

    if (args.type) {
      filters.push({
        type: args.type,
      });
    }

    const res = await this.prisna.design.findMany({
      where: {
        AND: filters,
      },
      skip,
      take,
    });
    return res;
  }
}
