import { SuspenseContentInput } from '@content-suspense/dto';
import { IEvent } from '@nestjs/cqrs';

export class ContentSuspendedEvent implements IEvent {
  constructor(
    public input: SuspenseContentInput,
    public userId: string,
  ) {}
}
