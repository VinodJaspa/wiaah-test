import { HotelRoom } from '@entities';
import { Injectable } from '@nestjs/common';
import {
  ExcludeFieldsFromObject,
  getTranslatedResource,
  GqlPaginationInput,
  UserPreferedLang,
} from 'nest-utils';
import { PrismaService } from 'prismaService';
import { HotelRoom as PrismaHotelRoom, Prisma } from 'prismaClient';
import { SearchHotelRoomLocationInput } from '../dto';
import { GqlHotelRoomAggregationSelectedFields } from '../types/selectedFields';

@Injectable()
export class HotelRoomRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getFilteredRoomsWithLocationSearch(
    { pagination, query, ...filters }: SearchHotelRoomLocationInput,
    selectedFields: GqlHotelRoomAggregationSelectedFields,
    langId: UserPreferedLang,
  ): Promise<HotelRoom[]> {
    const matches: Record<string, any> = {};

    if (filters.num_of_beds) {
      matches['beds'] = filters.num_of_beds;
    }

    if (filters.num_of_rooms) {
      matches['num_of_rooms'] = filters.num_of_rooms;
    }

    if (filters.minPrice && filters.maxPrice) {
      matches['pricePerNight'] = {
        $gte: filters.minPrice,
        $lte: filters.maxPrice,
      };
    } else if (filters.minPrice) {
      matches['pricePerNight'] = {
        $gte: filters.minPrice,
      };
    } else if (filters.maxPrice) {
      matches['pricePerNight'] = {
        $lte: filters.maxPrice,
      };
    }

    if (filters.rating) {
      matches['rating'] = {
        $gte: filters.rating,
      };
    }

    const fields = this.getSelectionFields(selectedFields);

    const rooms = (await this.prisma.hotelRoom.aggregateRaw({
      pipeline: [
        {
          $search: {
            index: 'location',
            text: {
              query,
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
        {
          $project: {
            ...fields,
          } as any,
        },
      ],
    })) as any;

    return rooms.map((v) => this.formatHotelRoom(v, langId));
  }

  getSelectionFields(fields: GqlHotelRoomAggregationSelectedFields) {
    return fields
      ? {
          ...fields,
          ...ExcludeFieldsFromObject(fields, ['description', 'title']),
          roomMetaInfo:
            fields.description || fields.title
              ? {
                  langId: true,
                  value: {
                    description: fields.description,
                    title: fields.title,
                  },
                }
              : undefined,

          createdAt: fields.createdAt
            ? {
                $dateToString: { date: '$createdAt' },
              }
            : undefined,
          updatedAt: fields.updatedAt
            ? {
                $dateToString: { date: '$updatedAt' },
              }
            : undefined,
          id: fields.id
            ? {
                $toString: '$_id',
              }
            : undefined,
          hotelId: fields.hotelId
            ? {
                $toString: 'hotelId',
              }
            : undefined,
        }
      : undefined;
  }

  formatHotelRoom(room: PrismaHotelRoom, langId: UserPreferedLang): HotelRoom {
    return {
      ...room,
      description: getTranslatedResource({
        langId,
        resource: room.roomMetaInfo,
      }).description,
      title: getTranslatedResource({
        langId,
        resource: room.roomMetaInfo,
      }).title,
      cancelationPolicies: room.cancelationPolicies,
      includedAmenities: getTranslatedResource({
        langId,
        resource: room.includedAmenities,
      }),
      includedServices: getTranslatedResource({
        langId,
        resource: room.includedServices,
      }),
      popularAmenities: room.popularAmenities.map((v) => ({
        ...v,
        label: getTranslatedResource({
          langId,
          resource: v.label,
        }),
      })),
      extras: room.extras.map((v) => ({
        ...v,
        name: getTranslatedResource({
          langId,
          resource: v.name,
        }),
      })),
    };
  }
}
