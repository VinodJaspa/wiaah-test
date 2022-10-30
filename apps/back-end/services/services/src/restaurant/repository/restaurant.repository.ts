import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { getTranslatedResource, UserPreferedLang } from 'nest-utils';
import {
  Prisma,
  RestaurantService as PrismaRestaurantService,
} from 'prismaClient';
import { PrismaService } from 'prismaService';

import { SearchFilteredRestaurantInput } from '../dto';
import { Restaurant } from '../entities';
import { GqlRestaurantAggregationSelectedFields } from '../types/gqlSelectedFields';
import { RestaurantElasticSearchRepository } from './restaurant.elastic.repository';

@Injectable()
export class RestaurantRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly elasticRepository: RestaurantElasticSearchRepository,
  ) {}

  async searchFilteredRestaurant(
    input: SearchFilteredRestaurantInput,
    selectedFields: GqlRestaurantAggregationSelectedFields,
    langId: UserPreferedLang,
  ): Promise<Restaurant[]> {
    const hasQuery = input?.query?.length > 0;
    const ids = hasQuery
      ? await this.elasticRepository.getRestaurantIdsByLocationQuery(
          input.query,
        )
      : [];

    const filters: Prisma.RestaurantServiceWhereInput[] = [];

    if (hasQuery) {
      filters.push({
        id: {
          in: ids,
        },
      });
    }

    if (input.establishmentTypeId) {
      filters.push({
        establishmentTypeId: input.establishmentTypeId,
      });
    }

    if (input.cusinesTypeId) {
      filters.push({
        cuisinesTypeId: input.cusinesTypeId,
      });
    }

    if (input.settingAndAmbinaceId) {
      filters.push({
        setting_and_ambianceId: input.settingAndAmbinaceId,
      });
    }

    if (input.paymentMethods) {
      filters.push({
        payment_methods: {
          hasSome: input.paymentMethods,
        },
      });
    }

    if (input.maxPrice && input.minPrice) {
      filters.push({
        lowest_price: {
          gte: input.minPrice,
        },
        highest_price: {
          lte: input.maxPrice,
        },
      });
    } else if (input.maxPrice) {
      filters.push({
        highest_price: {
          lte: input.maxPrice,
        },
      });
    } else if (input.minPrice) {
      filters.push({
        lowest_price: {
          gte: input.minPrice,
        },
      });
    }

    const rests = await this.prisma.restaurantService.findMany({
      where: {
        AND: [...filters],
      },
    });

    return Array.isArray(rests)
      ? rests.map((v) => this.formatRestaurant(v, langId))
      : [];
  }

  formatRestaurant(
    input: PrismaRestaurantService,
    langId: UserPreferedLang,
  ): Restaurant {
    return {
      ...input,
      serviceMetaInfo: getTranslatedResource({
        langId,
        resource: input.serviceMetaInfo,
      }),
      policies: getTranslatedResource({
        langId,
        resource: input.policies,
      }),
      menus: Array.isArray(input.menus)
        ? input.menus.map((v) => ({
            ...v,
            name: getTranslatedResource({
              langId,
              resource: v.name,
            }),
            dishs: Array.isArray(v.dishs)
              ? v.dishs.map((v) => ({
                  ...v,
                  name: getTranslatedResource({
                    langId,
                    resource: v.name,
                  }),
                  ingredients: getTranslatedResource({
                    langId,
                    resource: v.ingredients,
                  }),
                }))
              : [],
          }))
        : [],
    };
  }
}
