import { DynamicModule, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { WrongMailingProviderError } from "exceptions";

import { MailJetService } from "./services";

export const MAILING_MODULE_FOR_ROOT_OPTIONS_INJECTING_TOKEN =
  "mailing-options";

type MailingSendType = {
  to: { Email: string; Name: string }[];
  subject: string;
  text: string;
  html: string;
};

export interface IMailingService {
  send(props: MailingSendType): Promise<boolean>;
}

export class MailingService implements IMailingService {
  async send(props: MailingSendType): Promise<boolean> {
    return false;
  }
}

export const MailingProviders = {
  MAILJET: "MAILJET",
} as const;

export interface MailingModuleForRootOptions {
  apiKeyEnvKey: string;
  apiSecrentEnvKey: string;
  mailingEmailEnvKey: string;
  mailingNameEnvKey: string;
  provider: keyof typeof MailingProviders;
}

@Module({})
export class MailingModule {
  static forRoot(opts: MailingModuleForRootOptions): DynamicModule {
    const provider = Object.entries(MailingProviders).find(
      ([_, v]) => opts.provider === v
    );
    if (!provider) throw new WrongMailingProviderError();
    return {
      module: MailingModule,
      imports: [ConfigModule.forRoot({ envFilePath: ".env" })],
      providers: [
        {
          provide: MAILING_MODULE_FOR_ROOT_OPTIONS_INJECTING_TOKEN,
          useValue: opts,
        },
        {
          provide: MailingService,
          useClass:
            opts.provider === "MAILJET" ? MailJetService : MailingService,
        },
      ],
      exports: [MailingService],
    };
  }
}
