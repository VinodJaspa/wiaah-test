import { Injectable } from '@nestjs/common';
import { CommandBus, ofType, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';
import { CreateElasticHealthCenterCommand } from '../commands/impl/elastic';
import { HealthCenterCreatedEvent } from '../events/impl';

@Injectable()
export class HealthCenterSaga {
  constructor(private readonly commandBus: CommandBus) {}

  @Saga()
  healthCenterCreated(events$: Observable<any>): Observable<void> {
    return events$.pipe(
      ofType(HealthCenterCreatedEvent),
      map((v) => {
        this.commandBus.execute<CreateElasticHealthCenterCommand, any>(
          new CreateElasticHealthCenterCommand({
            dbId: v.input.id,
            ...v.input.location,
          }),
        );
      }),
    );
  }
}
