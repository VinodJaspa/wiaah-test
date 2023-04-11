import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { VerifyBookedServiceCommand } from '@book-service/commands/impl';
import { BookingRepository } from '@book-service/repository';
import { BookedService } from '@book-service/entities';
import { ServicePurchasedEvent } from '@book-service/events';

@CommandHandler(VerifyBookedServiceCommand)
export class VerifyBookedServiceCommandHandler
  implements ICommandHandler<VerifyBookedServiceCommand>
{
  constructor(
    private readonly repo: BookingRepository,
    private readonly eventbus: EventBus,
  ) {}

  async execute({
    serviceId,
  }: VerifyBookedServiceCommand): Promise<BookedService> {
    const res = await this.repo.updatePurchaseStatus(serviceId, true);
    this.eventbus.publish(new ServicePurchasedEvent(res));
    return res;
  }
}
