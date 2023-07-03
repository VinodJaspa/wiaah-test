import { Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { SERVICES } from 'nest-utils';
import { PrismaService } from 'prismaService';

export class BaseEventHandler {
  constructor(
    @Inject(SERVICES.BILLING_SERVICE.token)
    readonly kafkaClient: ClientKafka,
    readonly prisma: PrismaService,
  ) {}
}
