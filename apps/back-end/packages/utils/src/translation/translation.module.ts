import { Global, Inject, Injectable, Module, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { UserPreferedLang } from "../";
export const LANG_ID = "LANG_ID";

@Injectable()
export class TranslationService {
  constructor(
    @Inject(REQUEST)
    private readonly ctx: any
  ) {}

  getLangIdFromLangHeader(): UserPreferedLang {
    const langId = this.ctx?.req?.headers["accept-language"] || "en";
    return langId;
  }
}

@Global()
@Module({
  providers: [TranslationService],
  exports: [TranslationService],
})
export class TranslationModule {}
