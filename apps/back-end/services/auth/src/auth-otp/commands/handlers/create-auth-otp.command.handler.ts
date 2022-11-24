import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAuthOtpCommand } from '@auth-otp/commands';
import { AuthOtp } from '@auth-otp/entities';
import { AuthOtpRepository } from '@auth-otp/repository';
import { AddToDate, generateVerificationToken } from 'nest-utils';
import * as bcrypt from 'bcrypt';

@CommandHandler(CreateAuthOtpCommand)
export class CreateAuthOtpCommandHandler
  implements ICommandHandler<CreateAuthOtpCommand>
{
  constructor(private readonly repo: AuthOtpRepository) {}
  async execute({ email }: CreateAuthOtpCommand): Promise<AuthOtp> {
    const unHashed = generateVerificationToken(6);
    const code = await bcrypt.hash(unHashed, 16);

    const res = await this.repo.create(
      email,
      code,
      AddToDate(new Date(), { minutes: 15 }),
    );

    return res;
  }
}
