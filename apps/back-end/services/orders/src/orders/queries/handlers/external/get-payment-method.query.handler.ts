import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@orders/abstraction';
import {
  GetPaymentMethodQuery,
  GetPaymentMethodQueryRes,
} from '@orders/queries/impl';

@QueryHandler(GetPaymentMethodQuery)
export class GetPaymentMethodQueryHandler
  extends BaseQueryHandler
  implements IQueryHandler<GetPaymentMethodQuery>
{
  async execute({
    id,
  }: GetPaymentMethodQuery): Promise<GetPaymentMethodQueryRes> {
    // const res = await KafkaMessageHandler<string,getpaymentthed>(this.eventClient,KAFKA_MESSAGES)
    return null;
  }
}
