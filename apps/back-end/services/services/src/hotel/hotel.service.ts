import { Hotel } from '@entities';
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  DBErrorException,
  ExcludeFieldsFromObject,
  getTranslatedResource,
  UserPreferedLang,
} from 'nest-utils';
import { PrismaService } from 'prismaService';
import { EventBus } from '@nestjs/cqrs';
import {
  HotelService as PrismaHotelService,
  HotelRoom,
  Prisma,
} from 'prismaClient';

import { CreateHotelInput } from './dto/create-hotel.input';
import { GqlHotelSelectedFields } from './types/selectedFields';
import { HotelCreatedEvent, HotelRoomCreatedEvent } from './events';

@Injectable()
export class HotelService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  async getHotels() {
    const services = await this.prisma.hotelService.findMany({
      include: { rooms: true },
    });
    return services.map((v) => this.formatHotelData(v, 'en'));
  }

  async createHotelService(
    input: CreateHotelInput,
    userId: string,
    langId: UserPreferedLang,
  ): Promise<Hotel> {
    const hotel = await this.prisma.hotelService.create({
      data: {
        ...input,
        ownerId: userId,
        policies: input.policies,
        presentations: input.presentations,
        serviceMetaInfo: input.serviceMetaInfo,
        //@ts-ignore
        rooms:
          input.rooms.length > 0
            ? {
                createMany: {
                  data: input.rooms.map((v) => ({ ...v, sellerId: userId })),
                },
              }
            : undefined,
      },
      include: {
        rooms: true,
      },
    });
    this.eventBus.publish(new HotelCreatedEvent(input));
    // hotel.rooms?.forEach((v) => {
    //   this.eventBus.publish(
    //     new HotelRoomCreatedEvent({ hotel, room: v, userId }),
    //   );
    // });

    //@ts-ignore
    return this.formatHotelData({ ...hotel, rooms: hotel.rooms || [] }, langId);
  }

  async getHotelWithRoomsById(
    hotelId: string,
    langId: UserPreferedLang,
    selectedFields: GqlHotelSelectedFields,
  ): Promise<Hotel> {
    try {
      const hotel = await this.prisma.hotelService.findUnique({
        where: {
          id: hotelId,
        },
        include: {
          workingHours: true,
          rooms: true,
        },
        rejectOnNotFound() {
          throw new NotFoundException('hotel with the given id was not found');
        },
      });

      const formated = this.formatHotelData(
        hotel as PrismaHotelService & {
          rooms: HotelRoom[];
        },
        langId,
      );
      console.log({ formated, hotel });
      return formated;
    } catch (error) {
      const notFoundError = error instanceof NotFoundException;
      if (notFoundError) throw error;
      console.log(error);
      throw new DBErrorException(
        'failed to get hotel data, please make sure the id of the hotel is correct',
      );
    }
  }

  async checkViewHotelPremissions(hotelId: string, userId: string) {}

  getSelectionFields(
    fields: GqlHotelSelectedFields,
  ): Prisma.HotelServiceSelect {
    return fields
      ? {
          ...fields,
          serviceMetaInfo: {
            select: {
              langId: true,
              value: fields.serviceMetaInfo,
            },
          },
          rooms: fields.rooms
            ? {
                select: {
                  ...ExcludeFieldsFromObject(fields.rooms.select, [
                    'description',
                    'title',
                  ]),
                  roomMetaInfo:
                    fields.rooms.select.description || fields.rooms.select.title
                      ? {
                          select: {
                            langId: true,
                            value: {
                              select: {
                                description: fields.rooms.select?.description,
                                title: fields.rooms.select?.title,
                              },
                            },
                          },
                        }
                      : false,
                },
              }
            : false,
          policies: {
            select: {
              langId: true,
              value: fields.policies,
            },
          },
        }
      : undefined;
  }

  formatHotelData(
    hotel: PrismaHotelService & { rooms: HotelRoom[] },
    langId: UserPreferedLang,
  ): Hotel {
    return {
      ...hotel,
      policies: getTranslatedResource({
        langId,
        resource: hotel.policies,
      }),
      serviceMetaInfo: getTranslatedResource({
        langId,
        resource: hotel.serviceMetaInfo,
      }),
      //@ts-ignore
      rooms: hotel.rooms?.map((v) => ({
        ...v,
        includedAmenities: getTranslatedResource({
          resource: v.includedAmenities,
          langId,
        }),
        includedServices: getTranslatedResource({
          resource: v.includedServices,
          langId,
        }),
        ...getTranslatedResource({
          resource: v.roomMetaInfo,
          langId,
        }),
        cancelationPolicies: v.cancelationPolicies,
        hotelId: hotel.id,
        popularAmenities: v.popularAmenities?.map((v) => ({
          value: v.value,
          label: getTranslatedResource({
            resource: v.label,
            langId,
          }),
        })),
        extras: v.extras?.map((v) => ({
          cost: v.cost,
          name: getTranslatedResource({
            resource: v.name,
            langId,
          }),
        })),
      })),
    };
  }
}
