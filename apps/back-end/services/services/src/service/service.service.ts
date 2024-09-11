import { Injectable } from '@nestjs/common';
import { Service } from './entities/service.entity';
import { Service as ServicePrisma, ServiceType } from 'prismaClient';
import { getTranslatedResource } from 'nest-utils';
import { PrismaService } from 'prismaService';
import { CreateServiceInput } from './dto/create-service.input';
import { ObjectId } from 'mongodb';

@Injectable()
export class ServiceService {
  constructor(private prisma: PrismaService) { }

  async createService(service: CreateServiceInput) {
    console.log('CreateServcie');
    const { ...rest } = service;
    try {
      await this.prisma.service.create({
        data: {
          sellerId: service.sellerId,
          type: ServiceType.hotel,
          name: service.name,
          description: service.description,
          price: service.price,
          reviews: service.reviews,
          cancelable: service.cancelable,
          cancelationPolicy: service.cancelationPolicy,
          createdAt: new Date(),
          updatedAt: new Date(),
          status: service.status,
          vat: service.vat,
          isExternal: service.isExternal,
          includedServices: service.includedServices,
          popularAmenities: service.popularAmenities,
          extras: service.extras,
          includedAmenities: service.includedAmenities,
          measurements: service.measurements,
          thumbnail: service.thumbnail,
          dailyPrices: service.dailyPrices,
          dailyPrice: service.dailyPrice,
          beds: service.beds,
          num_of_rooms: service.num_of_rooms,
          bedrooms: service.beds,
          units: service.units,
          // TODO
          // presentations: servicePresenetations.map((v) => ({
          //   src: v.src,
          //   type:
          //     v.mimetype === FileTypeEnum.video
          //       ? ServicePresentationType.vid
          //       : ServicePresentationType.img,
          // })),
        },
      });

      return true;
    } catch (error) {
      // Log the full error object for debugging
      console.error('Detailed Error:', error);

      // Optionally, include error stack trace
      console.error('Error Stack:', error.stack);

      throw new Error('Service Creation Failed: ' + error.message);
    }
  }

  formatService(service: ServicePrisma, langId: string): Service {
    return {
      ...service,
      name: getTranslatedResource({ langId, resource: service.name }),
      description: getTranslatedResource({
        langId,
        resource: service.description,
      }),
      popularAmenities: getTranslatedResource({
        langId,
        resource: service.popularAmenities,
      }),
      includedServices: getTranslatedResource({
        langId,
        resource: service.includedServices,
      }),
      extras: service.extras.map((v) => ({
        ...v,
        name: getTranslatedResource({ langId, resource: v.name }),
      })),
      includedAmenities: getTranslatedResource({
        langId,
        resource: service.includedAmenities,
      }),
      ingredients: getTranslatedResource({
        langId,
        resource: service.ingredients,
      }),
    };
  }
}
