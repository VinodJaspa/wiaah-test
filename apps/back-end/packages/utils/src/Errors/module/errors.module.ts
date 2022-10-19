import { DynamicModule, Inject, Injectable, Module } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";

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
    private readonly options: ErrorHandlingModuleRegisterOptions<TMessages>,
    @Inject(REQUEST) private readonly request: any
  ) {}
  private lang = this.request?.req?.headers["accept-language"] as string;

  getError(fn: (messages: TMessages) => ErrorTranslationMessage): string {
    const resource = fn(this.options.messages);
    const message = resource[this.lang];
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
