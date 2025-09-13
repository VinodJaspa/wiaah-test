// src/features/Accounts/mutations/updateDataSharingPreferences.ts
import { createGraphqlRequestClient } from "api";

export type UpdateDataSharingPreferencesInput = {
  shareAdPartners: boolean;
  shareAnalyticsTools: boolean;
  shareSocialNetworks: boolean;
  sharePaymentProcessors: boolean;
};

export type UpdateDataSharingPreferencesMutation = {
  updateDataSharingPreferences: {
    id: string;
    shareAdPartners: boolean;
    shareAnalyticsTools: boolean;
    shareSocialNetworks: boolean;
    sharePaymentProcessors: boolean;
  };
};

export const updateDataSharingPreferencesMutation = async (
  input: UpdateDataSharingPreferencesInput
): Promise<UpdateDataSharingPreferencesMutation["updateDataSharingPreferences"]> => {
  const client = createGraphqlRequestClient();

  const mutation = `
    mutation updateDataSharingPreferences($input: UpdateDataSharingInput!) {
      updateDataSharingPreferences(input: $input) {
        id
        shareAdPartners
        shareAnalyticsTools
        shareSocialNetworks
        sharePaymentProcessors
      }
    }
  `;

  const res = await client
    .setQuery(mutation)
    .setVariables({ input })
    .send<UpdateDataSharingPreferencesMutation>();

  return res.data.updateDataSharingPreferences;
};
