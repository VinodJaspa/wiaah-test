import { DynamicModule, Inject, Injectable, Module } from "@nestjs/common";
import { UserPreferedLang } from "../../";

export type ErrorTranslationMessage = {
  en: string;
  fr: string;
  es: string;
  ge: string;
};

export type ErrorTranslationMessages = Record<string, ErrorTranslationMessage>;

interface ErrorHandlingModuleRegisterOptions<TErrorMessagesObject> {
  messages: TErrorMessagesObject;
}

@Module({})
export class ErrorHandlingModule {
  static register(
    opts: ErrorHandlingModuleRegisterOptions<any>
  ): DynamicModule {
    return {
      global: true,
      module: ErrorHandlingModule,
      providers: [
        ErrorHandlingService,
        {
          provide: "options",
          useValue: opts,
        },
      ],
      exports: [ErrorHandlingService],
    };
  }
}

@Injectable()
export class ErrorHandlingService<TMessages> {
  constructor(
    @Inject("options")
    private readonly options: ErrorHandlingModuleRegisterOptions<TMessages>
  ) {}
  getError(
    fn: (messages: TMessages) => ErrorTranslationMessage,
    langId: UserPreferedLang = "en",
    err?: any
  ): string {
    const resource = fn(this.options.messages);
    const message: any = resource[langId];
    if (typeof message !== "string") return Object.entries(resource).at(0)[1];
    return message;
  }
}

const defaultErrors = {
  DBError: {
    en: "",
    es: "",
    fr: "",
    ge: "",
  },
};

type DefaultErrors = typeof defaultErrors;

export function createErrorObject<
  T extends { [name: string]: ErrorTranslationMessage }
>(cfg: T): T & DefaultErrors {
  return {
    ...cfg,
    ...defaultErrors,
  };
}
