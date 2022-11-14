import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { IncrementProductVendorSiteCountCommand } from '@products/command';
import { VendorExternalLinkClickedEvent } from '@products/events/impl';

@EventsHandler(VendorExternalLinkClickedEvent)
export class VendorExternalLinkClickedEventHandler
  implements IEventHandler<VendorExternalLinkClickedEvent>
{
  constructor(private readonly commandBus: CommandBus) {}

  handle({ productId }: VendorExternalLinkClickedEvent) {
    this.commandBus.execute<IncrementProductVendorSiteCountCommand>(
      new IncrementProductVendorSiteCountCommand(productId),
    );
  }
}
