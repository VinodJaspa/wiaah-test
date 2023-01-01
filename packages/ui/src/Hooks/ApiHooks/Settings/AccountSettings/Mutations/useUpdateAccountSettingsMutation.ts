import { UpdateAccountSettingsFetcher } from "api";
import { useMutation } from "react-query";
import { UpdateAccouuntSettingsDto } from "types";

export const useUpdateAccountSettingsMutation = () => {
  return useMutation<unknown, unknown, UpdateAccouuntSettingsDto>(
    UpdateAccountSettingsFetcher
  );
};
