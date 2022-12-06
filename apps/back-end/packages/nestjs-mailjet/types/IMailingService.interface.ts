export type MailingSendType = {
  to: { Email: string; Name: string }[];
  from?: { Email: string; Name: string };
  subject: string;
  text: string;
  html: string;
};

export type MailingSendTemplateType = {
  to: { Email: string; Name: string }[];
  from?: { Email: string; Name: string };
  subject: string;
  vars?: Record<string, string>;
  templateId?: number | string;
};

export interface IMailingService {
  send(props: MailingSendType): Promise<boolean>;
  sendTemplate(props: MailingSendTemplateType): Promise<boolean>;
}
