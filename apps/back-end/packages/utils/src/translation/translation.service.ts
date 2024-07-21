import { Injectable, Inject } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { Request } from "express"; // Import Request from express
import { UserPreferedLang } from "../";

@Injectable()
export class TranslationService {
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  getLangIdFromLangHeader(): UserPreferedLang {
    // Use the `get` method to access headers
    const langId = this.request.headers["accept-language"]?.toString() || "en";
    return langId as UserPreferedLang;
  }
}
