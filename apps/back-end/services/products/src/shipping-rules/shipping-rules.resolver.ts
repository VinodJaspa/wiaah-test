import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ShippingRulesService } from './shipping-rules.service';
import { ShippingRule } from './entities/shipping-rule.entity';
import { UseGuards } from '@nestjs/common';
import {
  AuthorizationDecodedUser,
  GqlAuthorizationGuard,
  GqlCurrentUser,
} from 'nest-utils';
import { CreateShippingRuleInput } from './dto/create-shipping-rule.input';

@Resolver(() => ShippingRule)
export class ShippingRulesResolver {
  constructor(private readonly shippingRulesService: ShippingRulesService) {}

  @UseGuards(GqlAuthorizationGuard)
  createShippingRule(
    @Args('createShippingRuleArgs') input: CreateShippingRuleInput,
    @GqlCurrentUser() user: AuthorizationDecodedUser,
  ) {}
}
