import { KafkaMessage } from "../../Base";

export class MembershipRenewalFailEvent extends KafkaMessage<{
  customerName: string;
  customerEmail: string;
  type: "warn" | "ban";
}> {}
