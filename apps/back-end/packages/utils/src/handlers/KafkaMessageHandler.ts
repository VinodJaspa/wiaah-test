import { ClientKafka } from "@nestjs/microservices";

export function KafkaMessageHandler<TPattern, TInput, TData>(
  client: ClientKafka,
  messagePattern: TPattern,
  input: TInput,
  timeoutErrMessage?: string,
  timeout = 5000
): Promise<TData> {
  return new Promise<TData>((res, rej) => {
    const timer = setTimeout(() => {
      rej(timeoutErrMessage || `service timed out: ${messagePattern}`);
    }, timeout);
    client.send(messagePattern, input).subscribe((data: TData) => {
      console.log("msg", data);
      res(data);
      clearTimeout(timer);
    });
  });
}
