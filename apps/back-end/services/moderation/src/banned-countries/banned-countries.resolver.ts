import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { BannedCity, BannedCountry } from './entities/banned-country.entity';
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
import { Country } from '../country/entities/country.entity';
import { City } from '../country/entities/city.entity';

@Resolver(() => BannedCity)
export class BannedCountriesResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => [BannedCountry])
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  async getBannedCountries(
    @Args('args') args: GetBannedCountriesAdminInput,
  ): Promise<BannedCountry[]> {
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

      const bannedCitites = await this.prisma.bannedCity.findMany({
        where: {
          cityId: {
            in: cities.map((v) => v.id),
          },
        },
        skip,
        take,
      });

      let bannedCountries: BannedCountry[];
      for (const currCity of bannedCitites) {
        const city = cities.find((v) => v.id === currCity.cityId);

        const exists = bannedCountries.find(
          (v) => v.id === city.countryId,
        ) as BannedCountry;

        if (exists) {
          bannedCountries = bannedCountries
            .filter((v) => v.id === city.countryId)
            .concat([
              {
                ...exists,
                cities: [...exists.cities, currCity],
              },
            ]);
        } else {
          const country = await this.prisma.country.findUnique({
            where: {
              id: city.countryId,
            },
          });
          if (country) {
            bannedCountries = bannedCountries.concat([
              { cities: [currCity], isoCode: country.code, id: country.id },
            ]);
          }
        }
      }

      return bannedCountries;
    } catch {
      return [];
    }
  }

  @Query(() => BannedCountry)
  async adminGetBannedCountry(@Args('id') id: string): Promise<BannedCountry> {
    const citiesPromise = this.prisma.city.findMany({
      where: {
        countryId: id,
      },
    });

    const countryPromise = this.prisma.country.findUnique({
      where: {
        id,
      },
    });

    const cities = await citiesPromise;

    const country = await countryPromise;

    const res = await this.prisma.bannedCity.findMany({
      where: {
        cityId: {
          in: cities.map((v) => v.id),
        },
      },
    });

    return {
      id,
      isoCode: country.code,
      cities: res,
    };
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

  @ResolveField(() => City)
  city(@Parent() city: BannedCity) {
    return this.prisma.city.findUnique({
      where: {
        id: city.cityId,
      },
    });
  }
}

@Resolver(() => BannedCountry)
export class BannedCountryResolver {
  constructor(private readonly prisma: PrismaService) {}

  @ResolveField(() => Country)
  country(@Parent() parent: BannedCountry) {
    return this.prisma.country.findUnique({
      where: {
        code: parent.isoCode,
      },
    });
  }
}
