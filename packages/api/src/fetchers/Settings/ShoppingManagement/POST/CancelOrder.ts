import { CancelOrderDto } from "dto";
import { FetchingMock } from "utils";

export const cancelOrderFetcher = (input: CancelOrderDto) => {
  return FetchingMock;
};
