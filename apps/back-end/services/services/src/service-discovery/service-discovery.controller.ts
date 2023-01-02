import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  GetFilteredServicesMessage,
  GetFilteredServicesMessageReply,
} from 'nest-dto';
import { KAFKA_MESSAGES } from 'nest-utils';
import { PrismaService } from 'prismaService';

@Controller()
export class ServiceDiscoveryController {
  constructor(private readonly prisma: PrismaService) {}

  @MessagePattern(
    KAFKA_MESSAGES.SERVICES_MESSAGES.getFilteredServices('*', true),
  )
  async handleGetFilteredServices(
    @Payload() { value }: { value: GetFilteredServicesMessage },
  ): Promise<GetFilteredServicesMessageReply> {
    const {
      input: { city, country, servicesIds },
    } = value;

    // TODO: get filtered services after merging schema
    return new GetFilteredServicesMessageReply({
      data: {
        services: [],
      },
      error: null,
      success: true,
    });
  }
}
