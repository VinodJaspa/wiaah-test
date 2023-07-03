import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { FinancialAccountCreatedEvent } from '../impl/financialAccountCreated.event';
import { BaseEventHandler } from './BaseEventHandler';
import { KAFKA_EVENTS } from 'nest-utils';
import { FinancialAccountCreatedEvent as KafkaFinancialAccountCreatedEvent } from 'nest-dto';

@EventsHandler(() => FinancialAccountCreatedEvent)
export class FinancialAccountCreatedEventHandler
  extends BaseEventHandler
  implements IEventHandler<FinancialAccountCreatedEvent>
{
  handle({ acc }: FinancialAccountCreatedEvent) {
    this.kafkaClient.emit(
      KAFKA_EVENTS.BILLING_EVNETS.financialAccountCreated(acc.type),
      new KafkaFinancialAccountCreatedEvent({
        id: acc.accountId,
        last4: acc.cardLast4,
        type: acc.type,
        userId: acc.userId,
        cardType: acc.cardType,
      }),
    );
  }
}
