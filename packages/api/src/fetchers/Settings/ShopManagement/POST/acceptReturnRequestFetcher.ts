import { FetchingMock } from "utils";
import { AcceptReturnRequestDto } from "dto";
export const acceptReturnRequestFetcher = (input: AcceptReturnRequestDto) => {
  console.log("accept");
  return FetchingMock;
};
