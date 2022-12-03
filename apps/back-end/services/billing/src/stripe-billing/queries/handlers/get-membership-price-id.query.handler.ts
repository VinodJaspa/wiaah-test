import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { GetMembershipPriceIdQuery } from '@stripe-billing/queries/impl';
import {
  GetUserMembershipPriceIdMessage,
  GetUserMembershipPriceIdMessageReply,
} from 'nest-dto';
import { KafkaMessageHandler, KAFKA_MESSAGES, SERVICES } from 'nest-utils';

@QueryHandler(GetMembershipPriceIdQuery)
export class GetMembershipPriceIdQueryHandler
  implements IQueryHandler<GetMembershipPriceIdQuery>
{
  constructor(
    @Inject(SERVICES.BILLING_SERVICE.token)
    private readonly eventClient: ClientKafka,
  ) {}

  async execute({
    membershipId,
    user,
  }: GetMembershipPriceIdQuery): Promise<string> {
    const {
      results: { data, error, success },
    } = await KafkaMessageHandler<
      string,
      GetUserMembershipPriceIdMessage,
      GetUserMembershipPriceIdMessageReply
    >(
      this.eventClient,
      KAFKA_MESSAGES.BILLING_MESSAGES.getUserMembershipPriceId,
      new GetUserMembershipPriceIdMessage({
        membershipId,
        userId: user.id,
      }),
    );

    if (!success || !data || !data?.priceId) throw new Error(error.message);

    return data.priceId;
  }
}
