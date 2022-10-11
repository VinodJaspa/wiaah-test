import type { UploadServiceProviders } from "../";
export declare type UploadServiceProvidersType = keyof typeof UploadServiceProviders;
declare type UploadServiceProvider = number;
export declare type UploadModuleForRootOptions = {
    serviceKey: string;
    secretKey: string;
    provider?: UploadServiceProvider;
};
export {};
