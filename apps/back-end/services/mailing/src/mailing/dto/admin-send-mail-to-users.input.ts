import { Field, InputType, registerEnumType } from '@nestjs/graphql';

export enum MailUserType {
  subscribers = 'subscribers',
  all = 'all',
  shops = 'shops',
  service = 'service',
  buyers = 'buyers',
}

registerEnumType(MailUserType, { name: 'MailUserType' });

@InputType()
export class AdminSendMailToUsersInput {
  @Field(() => MailUserType)
  userType: MailUserType;

  @Field(() => String)
  subject: string;

  @Field(() => String)
  message: String;
}
