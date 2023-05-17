import { Injectable } from '@nestjs/common';
import { Service } from './entities/service.entity';
import { Service as ServicePrisma } from 'prismaClient';
import { getTranslatedResource } from 'nest-utils';

@Injectable()
export class ServiceService {
  constructor() {}

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
