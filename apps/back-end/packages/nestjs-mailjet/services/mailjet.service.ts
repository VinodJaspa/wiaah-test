import { Injectable, Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MAILING_MODULE_FOR_ROOT_OPTIONS_INJECTING_TOKEN } from "../const";
import MailJetType from "node-mailjet";
import {
  IMailingService,
  MailingModuleForRootOptions,
  MailingSendTemplateType,
  MailingSendType,
} from "../types";
const Mailjet = require("node-mailjet");

@Injectable()
export class MailJetService implements IMailingService {
  mailJet: MailJetType;
  constructor(
    @Inject(MAILING_MODULE_FOR_ROOT_OPTIONS_INJECTING_TOKEN)
    private readonly opts: MailingModuleForRootOptions,
    private readonly config: ConfigService
  ) {
    const apiKey = config.get(opts?.apiKeyEnvKey || "MJ_APIKEY");
    const apiSecret = config.get(opts?.apiSecrentEnvKey || "MJ_SECRETKEY");

    this.mailJet = new Mailjet({ apiKey, apiSecret });
  }

  async send({
    html,
    subject,
    text,
    to,
  }: {
    to: { Email: string; Name: string }[];
    subject: string;
    text: string;
    html: string;
  }): Promise<boolean> {
    await this.mailJet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: this.config.get(this.opts.mailingEmailEnvKey),
            Name: this.config.get(this.opts.mailingNameEnvKey),
          },
          To: to,
          Subject: subject,
          TextPart: text,
          HTMLPart: html,
        },
      ],
    });

    return true;
  }

  async sendTemplate(opts: MailingSendTemplateType) {
    try {
      const { from, to, subject, templateId, vars } = opts;
      await this.mailJet.post("send", { version: "v3.1" }).request({
        Messages: [
          {
            From: from,
            To: to,
            TemplateID: templateId,
            TemplateLanguage: true,
            Subject: subject,
            Variables: vars,
          },
        ],
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
