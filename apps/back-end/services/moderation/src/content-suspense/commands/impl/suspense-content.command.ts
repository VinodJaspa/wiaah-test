import { SuspenseContentInput } from '@content-suspense/dto';
import { IQuery } from '@nestjs/cqrs';

export class SuspenseContentCommand implements IQuery {
  constructor(
    public readonly input: SuspenseContentInput,
    public readonly userId: string,
  ) {}
}
