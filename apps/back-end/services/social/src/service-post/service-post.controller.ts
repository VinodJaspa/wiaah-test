import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ServiceCreatedEvent } from 'nest-dto';
import { KAFKA_EVENTS } from 'nest-utils';
import { PrismaService } from 'prismaService';

@Controller()
export class ServicePostController {
  constructor(private readonly prisma: PrismaService) {}

  @EventPattern(KAFKA_EVENTS.SERVICES.serviceCreated('*', true))
  async handleServicePostCreated(
    @Payload() { value }: { value: ServiceCreatedEvent },
  ) {
    await this.prisma.servicePost.create({
      data: {
        serviceId: value.input.id,
        userId: value.input.userId,
      },
    });
  }
}
