import { Inject, Injectable } from '@nestjs/common';
import {
  ActivatePartnerInput,
  AddPartnerInput,
  DeactivatePartnerInput,
  GetPartnersInput,
  RemovePartnerInput,
} from '@dto';
import { PrismaService } from 'src/prisma.service';
import { PaginatedPartners, Partner } from '@entities';
import { concatWords, KAFKA_EVENTS, SERVICES } from 'nest-utils';
import { ClientKafka } from '@nestjs/microservices';
import {
  PartnerActivatedEvent,
  PartnerCreatedEvent,
  PartnerDeActivatedEvent,
  PartnerRemovedEvent,
} from 'nest-dto';
import { PartnerStatus, Prisma } from '@prisma-client';
import { PartnerNotFoundException } from 'src/exceptions';

@Injectable()
export class PartnersService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(SERVICES.PARTNERS_SERVICE.token)
    private readonly eventsClient: ClientKafka,
  ) {}

  async getPartners(input: GetPartnersInput): Promise<PaginatedPartners> {
    const partners = await this.prisma.partner.findMany({
      take: input.take,
      skip: input.page * input.take,
    });

    return {
      data: partners,
      has_more: partners.length! < input.take,
      page: input.page,
    };
  }

  async addPartner(adminId: string, input: AddPartnerInput): Promise<Partner> {
    const createdPartner = await this.prisma.partner.create({
      data: { ...input, status: 'active' },
    });

    const { createdAt, id, name, thumbnail, updatedAt } = createdPartner;

    this.eventsClient.emit<PartnerCreatedEvent>(
      KAFKA_EVENTS.PARTNERS_EVENTS.partnerCreated,
      new PartnerCreatedEvent({
        addedBy: {
          id: adminId,
        },
        id,
        name,
        thumbnail,
      }),
    );

    return createdPartner;
  }

  async removePartner(
    adminId: string,
    input: RemovePartnerInput,
  ): Promise<Partner> {
    const deletedPartner = await this.prisma.partner.delete({
      where: {
        id: input.partnerId,
      },
    });
    const { id, name, thumbnail } = deletedPartner;
    this.eventsClient.emit<PartnerRemovedEvent>(
      KAFKA_EVENTS.PARTNERS_EVENTS.partnerRemoved,
      new PartnerRemovedEvent({
        id,
        name,
        thumbnail,
        removedBy: { id: adminId },
      }),
    );

    return deletedPartner;
  }

  async updatePartnerStatus(
    adminId: string,
    partnerId: string,
    status: PartnerStatus,
  ): Promise<Partner> {
    const updatedPartner = await this.updatePartner({
      where: {
        id: partnerId,
      },
      data: {
        status,
      },
    });
    const { id, name, thumbnail } = updatedPartner;
    this.eventsClient.emit<PartnerActivatedEvent>(
      KAFKA_EVENTS.PARTNERS_EVENTS.partnerActivated,
      new PartnerActivatedEvent({
        id,
        name,
        thumbnail,
        activatedBy: {
          id: adminId,
        },
      }),
    );
    return updatedPartner;
  }

  async deActivatePartner(
    adminId: string,
    input: DeactivatePartnerInput,
  ): Promise<Partner> {
    const updated = await this.updatePartnerStatus(
      adminId,
      input.id,
      'inActive',
    );
    const { id, name, thumbnail } = updated;
    this.eventsClient.emit<PartnerDeActivatedEvent>(
      KAFKA_EVENTS.PARTNERS_EVENTS.partnerDeActivated,
      new PartnerDeActivatedEvent({
        id,
        name,
        thumbnail,
        deactivatedBy: {
          id: adminId,
        },
      }),
    );
    return updated;
  }

  async activatePartner(
    adminId: string,
    input: ActivatePartnerInput,
  ): Promise<Partner> {
    const updated = await this.updatePartnerStatus(adminId, input.id, 'active');
    const { id, name, thumbnail } = updated;
    this.eventsClient.emit<PartnerActivatedEvent>(
      KAFKA_EVENTS.PARTNERS_EVENTS.partnerActivated,
      new PartnerActivatedEvent({
        id,
        thumbnail,
        name,
        activatedBy: {
          id: adminId,
        },
      }),
    );
    return updated;
  }

  async updatePartner(args: Prisma.PartnerUpdateArgs): Promise<Partner> {
    try {
      return this.prisma.partner.update(args);
    } catch {
      throw new PartnerNotFoundException(
        concatWords(Object.keys(args.where), 'and'),
      );
    }
  }
}
