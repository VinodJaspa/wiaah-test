import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Prisma } from '@prisma-client';
import {
  accountType,
  ExtractPagination,
  GqlAuthorizationGuard,
} from 'nest-utils';
import { PrismaService } from 'prismaService';
import {
  AdminGetShippingGeoZoneRulesInput,
  CreateShippingTypeRuleInput,
  UpdateShippingRuleGeoZoneInput,
  UpdateShippingTypeRuleInput,
} from './dto';
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
  getShippingGeoZoneRules(
    @Args('args') args: AdminGetShippingGeoZoneRulesInput,
  ) {
    let filters: Prisma.ShippingTypeRuleWhereInput[] = [];

    if (args.name) {
      filters.push({
        name: {
          contains: args.name,
        },
      });
    }

    if (args.description) {
      filters.push({
        description: {
          contains: args.description,
        },
      });
    }

    const { skip, take } = ExtractPagination(args.pagination);

    return this.prisma.shippingTypeRule.findMany({
      where: {
        AND: filters,
      },
      take,
      skip,
    });
  }

  @Query(() => ShippingTypeRule)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  getShippingTypeRule(@Args('id') id: string) {
    return this.prisma.shippingTypeRule.findUnique({
      where: {
        id,
      },
      include: {
        geoZones: true,
      },
    });
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

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  async updateShippingTypeRule(
    @Args('args') args: UpdateShippingTypeRuleInput,
  ) {
    try {
      await this.prisma.shippingTypeRule.update({
        where: {
          id: args.id,
        },
        data: {
          ...args,
          geoZones: {
            updateMany: args.zones.map((v) => ({
              where: {
                id: v.id,
              },
              data: {
                country: v.country,
                zone: v.zone,
              },
            })),
          },
        },
      });

      return true;
    } catch (error) {
      return false;
    }
  }
}
