import { FetchingMock } from "utils";

export const UpdateAccountSettingsFetcher = async (): Promise<boolean> => {
  await FetchingMock;
  return true;
};
