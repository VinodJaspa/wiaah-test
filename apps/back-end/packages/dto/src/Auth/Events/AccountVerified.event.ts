import { KafkaMessage } from "../../Base";

export class AccountVerifiedEvent extends KafkaMessage<{ email: string }> {}
