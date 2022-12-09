import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  CreateInsuranceCommand,
  CreateInsuranceCommandRes,
} from '@insurance/commands/impl';
import { InsuranceBaseQueryHandler } from '@insurance/abstraction';

@CommandHandler(CreateInsuranceCommand)
export class CreateInsuranceCommandHandler
  extends InsuranceBaseQueryHandler
  implements ICommandHandler<CreateInsuranceCommand>
{
  async execute({
    input,
  }: CreateInsuranceCommand): Promise<CreateInsuranceCommandRes> {
    const res = await this.repo.createOne(input);

    return res;
  }
}
