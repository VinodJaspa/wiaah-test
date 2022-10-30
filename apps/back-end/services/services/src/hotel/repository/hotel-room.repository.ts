import { HotelRoom } from '@entities';
import { Injectable } from '@nestjs/common';
import {
  ExcludeFieldsFromObject,
  getTranslatedResource,
  UserPreferedLang,
} from 'nest-utils';
import { PrismaService } from 'prismaService';
import { HotelRoom as PrismaHotelRoom, Prisma } from 'prismaClient';
import { SearchHotelRoomLocationInput } from '../dto';
import {
  GqlHotelRoomAggregationSelectedFields,
  GqlHotelRoomSelectedFields,
} from '../types/selectedFields';
import { HotelRoomElasticRepository } from './hotel-room.elastic.repository';

@Injectable()
export class HotelRoomRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hotelRoomElasticRepo: HotelRoomElasticRepository,
  ) {}

  async getFilteredRoomsWithLocationSearch(
    { pagination, query, ..._filters }: SearchHotelRoomLocationInput,
    selectedFields: GqlHotelRoomAggregationSelectedFields,
    langId: UserPreferedLang,
  ): Promise<HotelRoom[]> {
    const hasQuery = query?.length > 0;
    const ids = await this.hotelRoomElasticRepo.getRoomsIdByLocationQuery(
      query,
    );
    console.log({ ids, query });

    const filters: Prisma.HotelRoomWhereInput[] = [];

    if (hasQuery) {
      filters.push({
        id: {
          in: ids || [],
        },
      });
    }

    if (_filters.rating) {
      filters.push({
        rating: {
          gte: _filters.rating,
        },
      });
    }

    if (_filters.maxPrice && _filters.minPrice) {
      filters.push({
        pricePerNight: {
          gte: _filters.minPrice,
          lte: _filters.maxPrice,
        },
      });
    } else if (_filters.maxPrice) {
      filters.push({
        pricePerNight: {
          lte: _filters.maxPrice,
        },
      });
    } else if (_filters.minPrice) {
      filters.push({
        pricePerNight: {
          gte: _filters.minPrice,
        },
      });
    }

    const rooms = await this.prisma.hotelRoom.findMany({
      where: {
        AND: filters,
      },
      include: {
        hotel: !!selectedFields?.hotel,
      },
    });

    console.log(
      JSON.stringify({ filters, rooms: rooms.map((v) => v.id) }, null, 2),
    );
    return rooms.map((v) => this.formatHotelRoom(v, langId));
  }

  getSelectionFields(
    fields: GqlHotelRoomSelectedFields,
  ): Prisma.HotelRoomSelect {
    return fields
      ? {
          ...fields,
          ...ExcludeFieldsFromObject(fields, ['description', 'title']),
          roomMetaInfo:
            fields.description || fields.title
              ? {
                  select: {
                    langId: true,
                    value: {
                      select: {
                        description: fields.description,
                        title: fields.title,
                      },
                    },
                  },
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
