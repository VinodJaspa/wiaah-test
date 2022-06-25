import { KafkaMessageInterface } from "./KafkaMessageReply";

export class KafkaMessage<TInput> implements KafkaMessageInterface {
  constructor(public input: TInput) {}

  toString(): string {
    return JSON.stringify({
      input: this.input,
    });
  }
}
