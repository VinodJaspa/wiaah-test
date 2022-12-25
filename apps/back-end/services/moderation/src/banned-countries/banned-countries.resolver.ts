import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BannedCountry } from './entities/banned-country.entity';
import { PrismaService } from 'prismaService';
import { GetBannedCountriesAdminInput } from './dto/get-banned-countries-admin.input';
import { Prisma } from 'prismaClient';
import {
  accountType,
  ExtractPagination,
  GqlAuthorizationGuard,
} from 'nest-utils';
import { BanCitiesInput } from './dto/create-banned-country.input';
import { UseGuards } from '@nestjs/common';

@Resolver(() => BannedCountry)
export class BannedCountriesResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => [BannedCountry])
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  async getBannedCountries(@Args('args') args: GetBannedCountriesAdminInput) {
    try {
      const filters: Prisma.CityWhereInput[] = [];
      const { skip, take } = ExtractPagination(args.pagination);
      if (args.country) {
        filters.push({
          country: {
            name: {
              contains: args.country,
            },
          },
        });
      }

      if (args.city) {
        filters.push({
          name: {
            contains: args.city,
          },
        });
      }

      const cities = await this.prisma.city.findMany({
        where: {
          AND: filters,
        },
        take,
        skip,
      });

      return this.prisma.bannedCity.findMany({
        where: {
          cityId: {
            in: cities.map((v) => v.id),
          },
        },
        skip,
        take,
      });
    } catch {
      return [];
    }
  }

  @Mutation(() => Boolean)
  async banBuyersCities(@Args('args') args: BanCitiesInput) {
    try {
      await this.prisma.bannedCity.createMany({
        data: args.citiesIds.map((v) => ({
          cityId: v,
          bannedFor: accountType.BUYER,
        })),
      });

      return true;
    } catch {
      return false;
    }
  }
  @Mutation(() => Boolean)
  async banSellersCities(@Args('args') args: BanCitiesInput) {
    try {
      await this.prisma.bannedCity.createMany({
        data: args.citiesIds.map((v) => ({
          cityId: v,
          bannedFor: accountType.SELLER,
        })),
      });

      return true;
    } catch {
      return [];
    }
  }

  @Mutation(() => Boolean)
  async unBanSellersCities(@Args('args') args: BanCitiesInput) {
    try {
      await this.prisma.bannedCity.deleteMany({
        where: {
          AND: [
            {
              bannedFor: accountType.SELLER,
            },
            {
              cityId: {
                in: args.citiesIds,
              },
            },
          ],
        },
      });

      return true;
    } catch {
      return false;
    }
  }

  @Mutation(() => Boolean)
  async unBanBuyersCities(@Args('args') args: BanCitiesInput) {
    try {
      await this.prisma.bannedCity.deleteMany({
        where: {
          AND: [
            {
              bannedFor: accountType.BUYER,
            },
            {
              cityId: {
                in: args.citiesIds,
              },
            },
          ],
        },
      });

      return true;
    } catch {
      return false;
    }
  }
}
