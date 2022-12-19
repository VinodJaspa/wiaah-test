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

@Resolver(() => Design)
@UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
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
}
