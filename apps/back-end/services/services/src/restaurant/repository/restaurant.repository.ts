import { Injectable } from '@nestjs/common';
import { getTranslatedResource, UserPreferedLang } from 'nest-utils';
import {
  Prisma,
  RestaurantService as PrismaRestaurantService,
} from 'prismaClient';
import { PrismaService } from 'prismaService';

import { SearchFilteredRestaurantInput } from '../dto';
import { Restaurant } from '../entities';
import { GqlRestaurantAggregationSelectedFields } from '../types/gqlSelectedFields';

@Injectable()
export class RestaurantRepository {
  constructor(private readonly prisma: PrismaService) {}

  async searchFilteredRestaurant(
    input: SearchFilteredRestaurantInput,
    selectedFields: GqlRestaurantAggregationSelectedFields,
    langId: UserPreferedLang,
  ): Promise<Restaurant[]> {
    const matches = {};

    if (input.establishmentTypeId) {
      matches['establishmentTypeId'] = input.establishmentTypeId;
    }

    if (input.cusinesTypeId) {
      matches['cuisinesTypeId'] = input.cusinesTypeId;
    }

    if (input.settingAndAmbinaceId) {
      matches['setting_and_ambianceId'] = input.settingAndAmbinaceId;
    }

    if (input.paymentMethods) {
      matches['payment_methods'] = input.paymentMethods;
    }

    const rests = await this.prisma.restaurantService.aggregateRaw({
      pipeline: [
        {
          $search: {
            index: 'location',
            text: {
              query: input.query || '',
              path: {
                wildcard: '*',
              },
              fuzzy: {
                maxEdits: 2,
              },
            },
          },
        },
        {
          $match: matches,
        },
      ],
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
