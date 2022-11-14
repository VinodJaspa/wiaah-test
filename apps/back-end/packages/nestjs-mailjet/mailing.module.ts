import { DynamicModule, Module, Global } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import {
  MailingProviders,
  MAILING_MODULE_FOR_ROOT_OPTIONS_INJECTING_TOKEN,
} from "./const";
import {
  IMailingService,
  MailingSendType,
  MailingModuleForRootOptions,
} from "./types";
import { WrongMailingProviderError } from "./exceptions";
import { MailJetService } from "./services";

export class MailingService implements IMailingService {
  async send(props: MailingSendType): Promise<boolean> {
    return false;
  }
}

@Global()
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
          provide: MailingService,
          useClass:
            opts.provider === "MAILJET" ? MailJetService : MailingService,
        },
        {
          provide: MAILING_MODULE_FOR_ROOT_OPTIONS_INJECTING_TOKEN,
          useValue: opts,
        },
      ],
      exports: [MailingService],
    };
  }
}
