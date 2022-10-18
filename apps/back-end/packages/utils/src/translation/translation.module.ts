import { Global, Module } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
export const LANG_ID = "LANG_ID";

const LangIdService = {
  provide: LANG_ID,
  useFactory(ctx: any) {
    const langId = ctx?.req?.headers["accept-language"] || "en";
    return langId;
  },
  inject: [REQUEST],
};

@Global()
@Module({
  providers: [LangIdService],
  exports: [LangIdService],
})
export class TranslationModule {}
