import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ServiceOwnershipService } from '@service-ownership';
import { ErrorHandlingTypedService } from '@utils';
import {
  ErrorHandlingService,
  getTranslatedResource,
  UserPreferedLang,
} from 'nest-utils';
import { Prisma, VehicleService as PrismaVehicleService } from 'prismaClient';
import { PrismaService } from 'prismaService';
import { v4 as uuid } from 'uuid';

import { CreateVehicleServiceInput, UpdateVehicleInput } from '../dto';
import { VehicleService } from '../entities';
import { GqlVehicleSelectedFields } from '../types';

@Injectable()
export class VehicleServiceRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly serviceOwnership: ServiceOwnershipService,
    @Inject(ErrorHandlingService)
    private readonly errorHandlingService: ErrorHandlingTypedService,
  ) {}

  async create(
    input: CreateVehicleServiceInput,
    userId: string,
    selectedFields?: GqlVehicleSelectedFields,
    langId?: UserPreferedLang,
  ): Promise<VehicleService> {
    await this.checkCreatePremissions(userId);

    const created = await this.prisma.vehicleService.create({
      data: {
        ...input,
        ownerId: userId,
        vehicles: input.vehicles.map((v) => ({
          id: uuid(),
          brand: v.brand,
          cancelationPolicies: v.cancelationPolicies,
          model: v.model,
          presentations: v.presentations,
          price: v.price,
          properties: {
            ...v.properties,
          },
          title: v.title,
          typeId: v.typeId,
        })),
      },
      select: {
        ...this.getVehicleSelectionFields(selectedFields),
        id: true,
      },
    });

    await this.serviceOwnership.createVehicleServiceOwnership({
      ownerId: userId,
      serviceId: created.id,
    });

    return this.formatVehicleServicedata(created, langId);
  }

  async updateService(
    input: UpdateVehicleInput,
    userId: string,
    langId: UserPreferedLang,
    fields: GqlVehicleSelectedFields,
  ): Promise<VehicleService> {
    const { id, ...rest } = input;
    const service = await this.checkCrudPremissions(userId, id, fields, langId);
    const updated = await this.prisma.vehicleService.update({
      where: {
        id: id,
      },
      data: {
        ...rest,
        vehicles: rest.vehicles,
      },
      select: this.getVehicleSelectionFields(fields),
    });

    return this.formatVehicleServicedata(updated, langId);
  }

  async checkCrudPremissions(
    userId: string,
    serviceId: string,
    fields: GqlVehicleSelectedFields,
    langId: UserPreferedLang,
  ): Promise<PrismaVehicleService> {
    const service = await this.prisma.vehicleService.findUnique({
      where: {
        id: serviceId,
      },
    });
    if (!service)
      throw new NotFoundException(
        this.errorHandlingService.getError((v) => v.serviceIdNotFoundErr),
      );
    if (service.ownerId !== userId)
      throw new ForbiddenException(
        this.errorHandlingService.getError((v) => v.forbiddenActionErr, langId),
      );

    return service;
  }

  async getById(
    id: string,
    langId?: UserPreferedLang,
    selectedFields?: GqlVehicleSelectedFields,
  ) {
    const vehicle = await this.prisma.vehicleService.findUnique({
      where: {
        id,
      },
      select: this.getVehicleSelectionFields(selectedFields),
    });

    return this.formatVehicleServicedata(vehicle, langId);
  }

  async getAll(langId: UserPreferedLang): Promise<VehicleService[]> {
    return (await this.prisma.vehicleService.findMany()).map((v) =>
      this.formatVehicleServicedata(v, langId),
    );
  }

  async checkCreatePremissions(userId: string, langId?: UserPreferedLang) {
    const hasService = await this.serviceOwnership.getServiceOwnershipByUserId(
      userId,
    );
    if (hasService)
      throw new ForbiddenException(
        this.errorHandlingService.getError(
          (v) => v.serviceDuplicationErr,
          langId,
        ),
      );
  }

  getVehicleSelectionFields(
    fields: GqlVehicleSelectedFields,
  ): Prisma.VehicleServiceSelect {
    return {
      ...fields,
      policies: fields.policies
        ? {
            select: {
              langId: true,
              value: fields.policies,
            },
          }
        : false,
      serviceMetaInfo: fields.serviceMetaInfo
        ? {
            select: {
              langId: true,
              value: fields.serviceMetaInfo,
            },
          }
        : false,
    };
  }

  formatVehicleServicedata(
    input: Partial<PrismaVehicleService>,
    langId: UserPreferedLang,
  ): VehicleService {
    return {
      ...input,
      policies: getTranslatedResource({
        langId: langId,
        resource: input?.policies,
      }),
      serviceMetaInfo: getTranslatedResource({
        langId: langId,
        resource: input?.serviceMetaInfo,
      }),
      vehicles: input?.vehicles?.map((v) => ({
        ...v,
        title: getTranslatedResource({
          langId: langId,
          resource: v?.title,
        }),
      })),
      title: getTranslatedResource({
        langId: langId,
        resource: input?.title,
      }),
    } as VehicleService;
  }
}
