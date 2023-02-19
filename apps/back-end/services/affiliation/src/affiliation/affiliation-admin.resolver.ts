import { AffiliationPurchase } from '@affiliation-history/entities';
import { UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NoSchemaIntrospectionCustomRule } from 'graphql';
import {
  accountType,
  ExtractPagination,
  GqlAuthorizationGuard,
  GqlPaginationInput,
} from 'nest-utils';
import { PrismaService } from 'prismaService';
import { UpdateAffiliationCommand } from './commands';
import {
  GetFilteredAffiliationsInput,
  GetUserAffiliationsInput,
  GetUserAffiliationsPurchasesInput,
  UpdateAffiliationAdminInput,
} from './dto';
import { Affiliation } from './entities';
import {
  GetAffliationsBySellerIdQuery,
  GetFilteredAffiliationsQuery,
} from './queries';

@Resolver()
@UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
export class AffiliationAdminResolver {
  constructor(
    private commandbus: CommandBus,
    private querybus: QueryBus,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => [Affiliation])
  getUserAffiliations(@Args('args') args: GetUserAffiliationsInput) {
    return this.querybus.execute(
      new GetAffliationsBySellerIdQuery(args.id, args.pagination),
    );
  }

  @Mutation(() => Boolean)
  adminUpdateAffiliation(
    @Args('updateAffilaition') input: UpdateAffiliationAdminInput,
  ) {
    return this.commandbus.execute(
      new UpdateAffiliationCommand(input, input.sellerId),
    );
  }

  @Query(() => [Affiliation])
  getFilteredAffiliations(@Args('filters') args: GetFilteredAffiliationsInput) {
    return this.querybus.execute(new GetFilteredAffiliationsQuery(args));
  }
}
