import { KafkaMessage } from "../../Base";

export class CreateScheduledEvent extends KafkaMessage<{
  // kafak event to be triggerd with the payload
  event: string;
  // JSON stringify payload
  payload: string;

  triggerAt: string;
}> {}
