import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { CreateAccountVerificationRequestCommand } from '@acc-verification/commands/impl';
import { AccountVerificationRepository } from '@acc-verification/repository';
import { GetAccountSocialFollowersCountQuery } from '@acc-verification/queries';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(CreateAccountVerificationRequestCommand)
export class CreateAccountVerificationRequestCommandHandler
  implements ICommandHandler<CreateAccountVerificationRequestCommand>
{
  constructor(
    private readonly repo: AccountVerificationRepository,
    private querybus: QueryBus,
  ) {}

  async execute({
    userId,
    input,
  }: CreateAccountVerificationRequestCommand): Promise<boolean> {
    const followers = await this.querybus.execute(
      new GetAccountSocialFollowersCountQuery(userId),
    );

    if (followers < 50000)
      throw new BadRequestException(
        'Your Account need to have atleast 500000 followers to request a verification',
      );

    const res = await this.repo.create(input, userId);
    if (!res) return false;

    return true;
  }
}
