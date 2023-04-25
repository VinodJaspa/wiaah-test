import { createGraphqlRequestClient } from "api";
import {
  Account,
  Exact,
  Profile,
  Shop,
  UpdateAccountInput,
  UpdateProfileInput,
  UpdateUserShopInput,
} from "@features/API";
import { useMutation } from "react-query";

export type UpdateAccountSettingsMutationVariables = Exact<{
  accountArgs: UpdateAccountInput;
  profileArgs: UpdateProfileInput;
  shopArgs: UpdateUserShopInput;
}>;

export type UpdateAccountSettingsMutation = { __typename?: "Mutation" } & {
  editAccount: { __typename?: "Account" } & Pick<Account, "id">;
  updateUserProfile: { __typename?: "Profile" } & Pick<Profile, "id">;
  updateShop: { __typename?: "Shop" } & Pick<Shop, "id">;
};

export const useUpdateAccountSettingsMutation = () =>
  useMutation<boolean, any, UpdateAccountSettingsMutationVariables>(
    ["update-account-settings"],
    async (args) => {
      const client = createGraphqlRequestClient();

      const res = await client
        .setQuery(
          `
mutation updateAccountSettings($accountArgs:UpdateAccountInput!,$profileArgs:UpdateProfileInput!, $shopArgs:UpdateUserShopInput!){
  editAccount(editAccountInput:$accountArgs){
    id
  }
  updateUserProfile(args:$profileArgs){
    id
  }
  updateShop(args:$shopArgs){
    id
  }
}
    `
        )
        .setVariables<UpdateAccountSettingsMutationVariables>(args)
        .send<UpdateAccountSettingsMutation>();

      return true;
    }
  );
