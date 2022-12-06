import { KafkaMessage } from "../../Base";

export class AccountTermsAndConditionViolationEvent extends KafkaMessage<{
  id: string;
}> {}
