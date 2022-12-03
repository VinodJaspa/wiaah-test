import { KafkaMessage } from "../../Base";

export class AffiliationCreatedEvent extends KafkaMessage<{
  affiliationId: string;
  affiliatedItemType: string;
  itemId: string;
  itemOwnerId: string;
}> {}
