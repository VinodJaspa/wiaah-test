import { MailingProviders } from "../const";

export interface MailingModuleForRootOptions {
  apiKeyEnvKey: string;
  apiSecrentEnvKey: string;
  mailingEmailEnvKey: string;
  mailingNameEnvKey: string;
  provider: keyof typeof MailingProviders;
}
