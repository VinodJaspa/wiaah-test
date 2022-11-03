import { Injectable } from '@nestjs/common';
import { getTranslatedResource, UserPreferedLang } from 'nest-utils';
import { PrismaService } from 'prismaService';
import { Vehicle as PrismaVehicle } from 'prismaClient';

import { Vehicle } from '../entities';
import { GqlVehicleSelectedFields } from '../types';

@Injectable()
export class VehicleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getById(
    id: string,
    userId: string,
    langId: UserPreferedLang,
    selectedFields: GqlVehicleSelectedFields,
  ): Promise<Vehicle> {
    const res = await this.prisma.vehicle.findUnique({
      where: {
        id,
      },
    });
    return this.formatVehicleData(res, langId);
  }

  formatVehicleData(input: PrismaVehicle, langId: UserPreferedLang): Vehicle {
    return {
      ...input,
      title: getTranslatedResource({
        langId,
        resource: input.title,
      }),
    };
  }
}
