import {
  Resolver,
  Mutation,
  Args,
  ID,
  Query,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ShippingRulesService } from '@shipping-rules/shipping-rules.service';
import { ShippingRule } from '@shipping-rules/entities';
import { UseGuards } from '@nestjs/common';
import {
  accountType,
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import {
  CreateShippingRuleInput,
  UpdateShippingRuleInput,
} from '@shipping-rules/dto';
import { PrismaService } from 'prismaService';

@Resolver(() => ShippingRule)
@UseGuards(new GqlAuthorizationGuard([accountType.SELLER]))
export class ShippingRulesResolver {
  constructor(
    private readonly shippingRulesService: ShippingRulesService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => [ShippingRule])
  getMyShippingRules(@GqlCurrentUser() user: AuthorizationDecodedUser) {
    return this.shippingRulesService.getShippingRulesBySellerId(user.id);
  }

  @Mutation(() => ShippingRule)
  createShippingRule(
    @Args('createShippingRuleArgs') input: CreateShippingRuleInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.shippingRulesService.addShippingRule(user.id, input);
  }

  @Mutation(() => ShippingRule)
  updateShippingRule(
    @Args('updateShippingRuleArgs') input: UpdateShippingRuleInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.shippingRulesService.updateShippingRule(user.id, input);
  }

  @Mutation(() => ShippingRule)
  deleteShippingRule(
    @Args('id', { type: () => ID }) id: string,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {
    return this.shippingRulesService.deleteShippingRule(user.id, id);
  }

  @ResolveField(() => Number)
  listing(@Parent() rule: ShippingRule) {
    return this.prisma.product.count({
      where: {
        sellerId: rule.sellerId,
        shippingRulesIds: {
          has: rule.id,
        },
      },
    });
  }
}
