import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import { ValidateLoginSecurityFeaturesQuery } from '@auth/queries';
import { GetAuthOtpQuery } from '@auth-otp/queries';
import { GetUserAuthSettingsQuery } from '@auth-settings/queries';
import { InternalServerErrorException } from '@nestjs/common';
import { UserAuthSetting } from '@auth-settings/entities';
import { ResponseCodes } from '@auth/const';

@QueryHandler(ValidateLoginSecurityFeaturesQuery)
export class ValidateLoginSecurityFeaturesQueryHandler
  implements IQueryHandler<ValidateLoginSecurityFeaturesQuery>
{
  constructor(private readonly querybus: QueryBus) {}

  async execute({
    email,
  }: ValidateLoginSecurityFeaturesQuery): Promise<number> {
    const settings = await this.querybus.execute<
      GetUserAuthSettingsQuery,
      UserAuthSetting
    >(new GetUserAuthSettingsQuery(email));
    if (!settings) throw new InternalServerErrorException();

    if (settings.twoFactoryAuth) {
      return ResponseCodes.RequireSmsOTP;
    }
    return null;
  }
}
