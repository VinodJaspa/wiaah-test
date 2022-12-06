import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SuspenseContentCommand } from '@content-suspense/commands/impl';
import { ContentSuspenseBaseHandler } from '@content-suspense/abastraction';
import { ContentSuspendedEvent } from '@content-suspense/events';

@CommandHandler(SuspenseContentCommand)
export class SuspenseContentCommandHandler
  extends ContentSuspenseBaseHandler
  implements ICommandHandler<SuspenseContentCommand>
{
  async execute({ input, userId }: SuspenseContentCommand): Promise<boolean> {
    this.eventbus.publish(new ContentSuspendedEvent(input, userId));
    return true;
  }
}
