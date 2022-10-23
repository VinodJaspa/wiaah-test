import { HotelServiceEntity } from '@entities';
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  DBErrorException,
  getTranslatedResource,
  TranslationService,
} from 'nest-utils';
import { PrismaService } from 'prismaService';
import { CreateHotelInput } from './dto/create-hotel.input';
import { HotelService as PrismaHotelService, HotelRoom } from 'prismaClient';

@Injectable()
export class HotelService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly translationService: TranslationService,
  ) {}

  getLangId() {
    return this.translationService.getLangIdFromLangHeader();
  }
  async createHotelService(
    input: CreateHotelInput,
    userId: string,
    lang: string,
  ): Promise<HotelServiceEntity> {
    const hotel = await this.prisma.hotelService.create({
      data: {
        ...input,
        ownerId: userId,
        policies: input.policies,
        presentations: input.presentations,
        serviceMetaInfo: input.serviceMetaInfo,
        rooms:
          input.rooms.length > 0
            ? {
                createMany: {
                  data: input.rooms,
                },
              }
            : undefined,
      },
      include: {
        rooms: input.rooms.length > 0,
      },
    });

    return this.formatHotelData({ ...hotel, rooms: hotel.rooms || [] });
  }

  async getHotelWithRoomsById(
    hotelId: string,
    userId: string,
    lang: string,
  ): Promise<HotelServiceEntity> {
    await this.checkViewHotelPremissions(hotelId, userId);

    try {
      const hotel = await this.prisma.hotelService.findUnique({
        where: {
          id: hotelId,
        },
        rejectOnNotFound() {
          throw new NotFoundException('hotel with the given id was not found');
        },
      });

      return this.formatHotelData(Object.assign(hotel, { rooms: [] }));
    } catch (error) {
      const notFoundError = error instanceof NotFoundException;
      if (notFoundError) throw error;
      throw new DBErrorException(
        'failed to get hotel data, please make sure the id of the hotel is correct',
      );
    }
  }

  async checkViewHotelPremissions(hotelId: string, userId: string) {}

  formatHotelData(
    hotel: PrismaHotelService & { rooms: HotelRoom[] },
  ): HotelServiceEntity {
    return {
      ...hotel,
      policies: getTranslatedResource({
        langId: this.getLangId(),
        resource: hotel.policies,
      }),
      serviceMetaInfo: getTranslatedResource({
        langId: this.getLangId(),
        resource: hotel.serviceMetaInfo,
      }),
      rooms: hotel.rooms.map((v) => ({
        ...v,
        includedAmenites: getTranslatedResource({
          resource: v.includedAmenities,
          langId: this.getLangId(),
        }),
        includedServices: getTranslatedResource({
          resource: v.includedServices,
          langId: this.getLangId(),
        }),
        ...getTranslatedResource({
          resource: v.roomMetaInfo,
          langId: this.getLangId(),
        }),
        cancelationPolicices: v.cancelationPolicies,
        hotelId: hotel.id,
        popularAmenities: v.popularAmenities.map((v) => ({
          value: v.value,
          label: getTranslatedResource({
            resource: v.label,
            langId: this.getLangId(),
          }),
        })),
        extras: v.extras.map((v) => ({
          cost: v.cost,
          name: getTranslatedResource({
            resource: v.name,
            langId: this.getLangId(),
          }),
        })),
      })),
    };
  }
}
