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
  ExtractPagination,
  getTranslatedResource,
  updateTranslationResource,
  UserPreferedLang,
} from 'nest-utils';
import {
  Prisma,
  VehicleService as PrismaVehicleService,
  Vehicle as PrismaVehicle,
} from 'prismaClient';
import { PrismaService } from 'prismaService';
import { v4 as uuid } from 'uuid';

import {
  CreateVehicleServiceInput,
  SearchFilteredVehicleInput,
  UpdateVehicleInput,
  UpdateVehicleServiceInput,
} from '../dto';
import { Vehicle, VehicleService } from '../entities';
import {
  GqlVehicleSelectedFields,
  GqlVehicleServiceSelectedFields,
} from '../types';
import { VehicleServiceElasticRepository } from './vehicle-service.elastic.repository';

@Injectable()
export class VehicleServiceRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly serviceOwnership: ServiceOwnershipService,
    @Inject(ErrorHandlingService)
    private readonly errorHandlingService: ErrorHandlingTypedService,
    private readonly elasticRepo: VehicleServiceElasticRepository,
  ) {}

  async searchVehiclesByLocationQuery(
    input: SearchFilteredVehicleInput,
    langId: UserPreferedLang,
    selectedFields: GqlVehicleSelectedFields,
  ): Promise<Vehicle[]> {
    const hasQuery = input?.query?.length > 0;

    const ids = hasQuery
      ? await this.elasticRepo.searchVehicleIdsByQuery(input.query)
      : [];

    const filters: Prisma.VehicleWhereInput[] = [];

    if (Array.isArray(ids) && ids.length > 0) {
      filters.push({
        id: {
          in: ids,
        },
      });
    }

    if (input.passengerNum) {
      // filters.push({});
    }

    if (input.seatsNum) {
      filters.push({
        // properties:{
        //   seats:input.seatsNum
        // }
      });
    }

    if (input.maxPrice && input.minPrice) {
      filters.push({
        price: {
          lte: input.maxPrice,
          gte: input.minPrice,
        },
      });
    } else if (input.maxPrice) {
      filters.push({
        price: {
          lte: input.maxPrice,
        },
      });
    } else if (input.minPrice) {
      filters.push({
        price: {
          gte: input.minPrice,
        },
      });
    }

    if (input.vehicleTypeId) {
      filters.push({
        typeId: input.vehicleTypeId,
      });
    }

    if (input.rating) {
      filters.push({
        rating: {
          gte: input.rating,
        },
      });
    }

    if (input.securityDeposit) {
      filters.push({
        securityDeposit: {
          lte: input.securityDeposit,
        },
      });
    }

    if (typeof input.freeCancelation === 'boolean') {
      filters.push({
        cancelationPolicies: {
          some: {
            cost: input.freeCancelation ? 0 : undefined,
          },
        },
      });
    }

    const { skip, take } = ExtractPagination(input.pagination);
    const vehicles = await this.prisma.vehicle.findMany({
      where: {
        AND: filters,
      },
      skip,
      take,
    });

    return vehicles.map((v) => this.formatVehicleData(v, langId));
  }

  async create(
    input: CreateVehicleServiceInput,
    userId: string,
    selectedFields?: GqlVehicleServiceSelectedFields,
    langId?: UserPreferedLang,
  ): Promise<VehicleService> {
    await this.checkCreatePremissions(userId);

    const created = await this.prisma.vehicleService.create({
      data: {
        ...input,
        ownerId: userId,
        vehicles: {
          createMany: {
            data: input.vehicles.map((v) => ({
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
        },
      },
      include: {
        vehicles: !!selectedFields.vehicles,
      },
    });

    await this.serviceOwnership.createVehicleServiceOwnership({
      ownerId: userId,
      serviceId: created.id,
    });

    return this.formatVehicleServicedata(created, langId);
  }

  async updateService(
    input: UpdateVehicleServiceInput,
    userId: string,
    langId: UserPreferedLang,
    fields: GqlVehicleServiceSelectedFields,
  ): Promise<VehicleService> {
    const { id, ...rest } = input;
    const service = await this.checkCrudPremissions(
      userId,
      id,
      //@ts-ignore
      { ...fields, serviceMetaInfo: true, policies: true },
      langId,
    );
    const updated = await this.prisma.vehicleService.update({
      where: {
        id: id,
      },
      data: {
        ...rest,
        policies: updateTranslationResource({
          originalObj: service.policies,
          update: rest.policies,
        }),
        serviceMetaInfo: updateTranslationResource({
          originalObj: service.serviceMetaInfo,
          update: rest.serviceMetaInfo,
        }),
      },
      select: this.getVehicleSelectionFields(fields),
    });

    return this.formatVehicleServicedata(updated, langId);
  }

  async updateVehicles(
    ogVehiclesData: PrismaVehicle[],
    updatingData: UpdateVehicleInput[],
    upsert: boolean = false,
  ): Promise<PrismaVehicle[]> {
    const existingVehicles: {
      og: PrismaVehicle;
      update: UpdateVehicleInput;
    }[] = [];
    const newVehicles: UpdateVehicleInput[] = [];
    const unTouchedVehicles: PrismaVehicle[] = ogVehiclesData.filter(
      (v) => existingVehicles.findIndex((eV) => eV.og.id === v.id) < 0,
    );

    updatingData.forEach((v) => {
      const idx = ogVehiclesData.findIndex((ogV) => ogV.id === v.id);
      if (idx > -1) {
        existingVehicles.push({
          og: ogVehiclesData[idx],
          update: v,
        });
      } else {
        newVehicles.push(v);
      }
    });

    const updatedVehicles: PrismaVehicle[] = existingVehicles.map(
      ({ og, update }) => ({
        ...og,
        ...update,
        title: updateTranslationResource({
          originalObj: og.title,
          update: update.title,
        }),
      }),
    );

    return [...unTouchedVehicles, ...updatedVehicles];
  }

  async checkCrudPremissions(
    userId: string,
    serviceId: string,
    fields: GqlVehicleServiceSelectedFields,
    langId: UserPreferedLang,
  ): Promise<PrismaVehicleService> {
    const service = await this.prisma.vehicleService.findUnique({
      where: {
        id: serviceId,
      },
      select: {
        ...this.getVehicleSelectionFields(fields),
        ownerId: true,
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

    return service as PrismaVehicleService;
  }

  async getById(
    id: string,
    langId?: UserPreferedLang,
    selectedFields?: GqlVehicleServiceSelectedFields,
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
    fields: GqlVehicleServiceSelectedFields,
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
    } as VehicleService;
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
