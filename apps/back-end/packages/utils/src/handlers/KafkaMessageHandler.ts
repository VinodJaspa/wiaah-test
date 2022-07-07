import { ClientKafka } from "@nestjs/microservices";

export function KafkaMessageHandler<TPattern, TInput, TData>(
  client: ClientKafka,
  messagePattern: TPattern,
  input: TInput,
  timeoutErrMessage?: string,
  timeout = 2000
): Promise<TData> {
  return new Promise<TData>((res, rej) => {
    const date = Date.now();
    console.log("send", messagePattern);
    const timer = setTimeout(() => {
      rej(timeoutErrMessage || "service timed out");
    }, timeout);
    client.send(messagePattern, input).subscribe((data: TData) => {
      console.log(messagePattern, data, date - Date.now());
      res(data);
      clearTimeout(timer);
    });
  });
}
