import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { CreateAffiliationCommand } from '@affiliation/commands/impl';
import { Affiliation } from '@affiliation/entities';
import { AffiliationRepository } from '@affiliation/repository';
import { GetAffiliationItemSellerIdQuery } from '@affiliation/queries';
import {
  BadRequestException,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import {
  KAFKA_EVENTS,
  KAFKA_MESSAGES,
  KAFKA_SERVICE_TOKEN,
  KafkaMessageHandler,
  SERVICES,
} from 'nest-utils';
import {
  AffiliationCreatedEvent,
  GetIsExternalSeller,
  GetIsExternalSellerReply,
} from 'nest-dto';
import { ClientKafka } from '@nestjs/microservices';

@CommandHandler(CreateAffiliationCommand)
export class CreateAffiliationCommandHandler
  implements ICommandHandler<CreateAffiliationCommand>
{
  constructor(
    private readonly repo: AffiliationRepository,
    private readonly querybus: QueryBus,
    @Inject(SERVICES.AFFILIATION_SERVICE.token)
    private readonly eventClient: ClientKafka,
  ) {}

  async execute({
    input,
    sellerId,
  }: CreateAffiliationCommand): Promise<Affiliation> {
    const itemSellerId =
      await this.querybus.execute<GetAffiliationItemSellerIdQuery>(
        new GetAffiliationItemSellerIdQuery(input.itemId, input.itemType),
      );
    if (itemSellerId !== sellerId) throw new UnauthorizedException();

    const {
      results: { data, error, success },
    } = await KafkaMessageHandler<
      string,
      GetIsExternalSeller,
      GetIsExternalSellerReply
    >(
      this.eventClient,
      KAFKA_MESSAGES.MEMBERSHIP_MESSAGES.isExternalSeller,
      new GetIsExternalSeller({ sellerId }),
    );

    if (!success) throw error;

    if (!data.isExternal)
      throw new BadRequestException(
        'you cannot create affiliations with your account type',
      );

    const res = await this.repo.create(input, sellerId);

    this.eventClient.emit(
      KAFKA_EVENTS.AFFILIATION.affiliationEntryCreated,
      new AffiliationCreatedEvent({
        affiliatedItemType: res.itemType,
        affiliationId: res.id,
        itemId: res.itemId,
        itemOwnerId: res.sellerId,
      }),
    );

    return res;
  }
}
