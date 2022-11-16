export type MailingSendType = {
  to: { Email: string; Name: string }[];
  subject: string;
  text: string;
  html: string;
};

export interface IMailingService {
  send(props: MailingSendType): Promise<boolean>;
}
