import type { UploadServiceProviders } from "../";

export type UploadServiceProvidersType = keyof typeof UploadServiceProviders;

type UploadServiceProvider = number;

export type UploadModuleForRootOptions = {
  cloudName: any;
  serviceKey: string;
  secretKey: string;
  provider?: UploadServiceProvider;
};
