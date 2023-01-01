import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { accountType, GqlAuthorizationGuard } from 'nest-utils';
import { PrismaService } from 'prismaService';
import { CreateShippingTypeRuleInput } from './dto';
import { CreateShippingGeoZone } from './dto/create-shipping-geo-zone.input';
import {
  ShippingRuleGeoZone,
  ShippingTypeRule,
} from './entities/shipping-type-rule.entity';

@Resolver(() => ShippingTypeRule)
export class ShippingTypeRuleResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => [ShippingTypeRule])
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  getShippingGeoZoneRules() {
    return this.prisma.shippingTypeRule.findMany();
  }

  @Query(() => [ShippingRuleGeoZone])
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  getShippingRuleGeoZones(@Args('id') id: string) {
    return this.prisma.geoZone.findMany({
      where: {
        shippingTypeRuleId: id,
      },
    });
  }

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  async createShippingTypeRuleGeoZone(
    @Args('args') args: CreateShippingGeoZone,
  ) {
    await this.prisma.geoZone.create({
      data: args,
    });

    return true;
  }

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  async createShippingTypeRule(
    @Args('args') args: CreateShippingTypeRuleInput,
  ) {
    await this.prisma.shippingTypeRule.create({
      data: args,
    });

    return true;
  }
}
