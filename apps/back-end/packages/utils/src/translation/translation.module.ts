import { Global, Module, Scope } from "@nestjs/common";
import { TranslationService } from "./translation.service";
import { REQUEST } from "@nestjs/core";
import { APP_INTERCEPTOR } from "@nestjs/core";
export const LANG_ID = "LANG_ID";

@Global()
@Module({
  imports: [TranslationService],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useFactory: () => new (require("express").Request())(),
    },
    TranslationService,
  ],
  exports: [TranslationService],
})
export class TranslationModule {}
