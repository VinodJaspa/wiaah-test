import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ServiceBookedEvent } from 'nest-dto';
import { KAFKA_EVENTS } from 'nest-utils';
import { CreateInsuranceCommand } from '@insurance/commands';
import {
  GetServiceDataQuery,
  GetServiceDataQueryRes,
} from '@insurance/queries';

@Controller()
export class InsuranceController {
  constructor(
    private readonly commandbus: CommandBus,
    private readonly querybus: QueryBus,
  ) {}

  @EventPattern(KAFKA_EVENTS.SERVICES.serviceBooked('*', true))
  async handleServiceBooked(
    @Payload() { value }: { value: ServiceBookedEvent },
  ) {
    const { id, purchaserId, sellerId, type, bookId } = value.input;

    const service = await this.querybus.execute<
      GetServiceDataQuery,
      GetServiceDataQueryRes
    >(new GetServiceDataQuery(id, type));

    if (!service) return;

    await this.commandbus.execute(
      new CreateInsuranceCommand({
        buyerId: purchaserId,
        itemId: id,
        itemType: type,
        sellerId,
        amount: service.insuranceAmount,
        bookId,
      }),
    );
  }
}
