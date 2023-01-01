import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NewAccountCreatedEvent } from 'nest-dto';
import { KAFKA_EVENTS } from 'nest-utils';
import { PrismaService } from 'prismaService';

@Controller('profession')
export class ProfessionController {
  constructor(private primsa: PrismaService) {}
  @EventPattern(KAFKA_EVENTS.ACCOUNTS_EVENTS.accountCreated('*', true))
  async handleNewAccount(
    @Payload() { value }: { value: NewAccountCreatedEvent },
  ) {
    if (value.input.profession) {
      await this.primsa.profession.update({
        where: {
          id: value.input.profession,
        },
        data: {
          usage: {
            increment: 1,
          },
        },
      });
    }
  }
}
