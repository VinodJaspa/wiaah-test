import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { MailingService } from '@mailing/mailing.service';
import { accountType, GqlAuthorizationGuard } from 'nest-utils';
import {
  AdminSendMailToUsersInput,
  MailUserType,
} from './dto/admin-send-mail-to-users.input';

@Resolver()
export class MailingResolver {
  constructor(private readonly service: MailingService) {}

  @Mutation(() => Boolean)
  @UseGuards(new GqlAuthorizationGuard([accountType.ADMIN]))
  async sendGeneralMail(
    @Args('args')
    args: AdminSendMailToUsersInput,
  ): Promise<boolean> {
    try {
      const mails = [];
      switch (args.userType) {
        case MailUserType.all:
          break;

        default:
          break;
      }

      await this.service.sendRawTemplate({
        subject: args.subject,
        html: `<p>${args.message}</p>`,
        to: mails,
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
