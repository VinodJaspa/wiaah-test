import { AuthOtp } from '@auth-otp/entities';
import { GetAuthOtpQuery } from '@auth-otp/queries';
import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import * as bycrpt from 'bcrypt';
import { ValidateLoginOtpCommand } from '@auth/commands/impl';

@CommandHandler(ValidateLoginOtpCommand)
export class ValidateLoginOtpCommandHandler
  implements ICommandHandler<ValidateLoginOtpCommand>
{
  constructor(private readonly querybus: QueryBus) {}

  async execute({ email, otp }: ValidateLoginOtpCommand): Promise<boolean> {
    const res = await this.querybus.execute<GetAuthOtpQuery, AuthOtp>(
      new GetAuthOtpQuery(email),
    );
    if (!res) throw new BadRequestException('wrong email or otp');

    if (new Date(res.expiresAt) < new Date())
      throw new BadRequestException('OTP Code expired');

    return bycrpt.compare(otp, res.code);
  }
}
