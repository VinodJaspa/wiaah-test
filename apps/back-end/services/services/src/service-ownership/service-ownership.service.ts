import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prismaService';
import {
  ServiceOwnership,
  CreateServiceOwnershipInput,
} from '@service-ownership';

@Injectable()
export class ServiceOwnershipService {
  constructor(private readonly prisma: PrismaService) {}

  getServiceOwnershipByUserId(ownerId: string): Promise<ServiceOwnership> {
    return this.prisma.serviceOwnerShip.findUnique({
      where: {
        ownerId,
      },
    });
  }

  getServiceOwnershopByServiceId(serviceId: string): Promise<ServiceOwnership> {
    return this.prisma.serviceOwnerShip.findUnique({
      where: {
        serviceId,
      },
    });
  }

  deleteServiceOwnerShipByUserId(ownerId: string): Promise<ServiceOwnership> {
    return this.prisma.serviceOwnerShip.delete({
      where: {
        ownerId,
      },
    });
  }

  deleteServiceOwnerShipByServiceId(
    serviceId: string,
  ): Promise<ServiceOwnership> {
    return this.prisma.serviceOwnerShip.delete({
      where: {
        serviceId,
      },
    });
  }

  createHotelServiceOwnership(
    input: CreateServiceOwnershipInput,
  ): Promise<ServiceOwnership> {
    return this.prisma.serviceOwnerShip.create({
      data: {
        ...input,
        serviceType: 'hotel',
      },
    });
  }

  createRestaurantServiceOwnership(
    input: CreateServiceOwnershipInput,
  ): Promise<ServiceOwnership> {
    return this.prisma.serviceOwnerShip.create({
      data: {
        ...input,
        serviceType: 'hotel',
      },
    });
  }
}
