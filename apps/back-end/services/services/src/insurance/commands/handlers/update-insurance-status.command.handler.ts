import { BaseCommandHandler } from '@insurance/abstraction';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  UpdateInsuranceStatusCommand,
  UpdateInsuranceStatusCommandRes,
} from '@insurance/commands';

@CommandHandler(UpdateInsuranceStatusCommand)
export class UpdateInsuranceStatusCommandHandler
  extends BaseCommandHandler
  implements ICommandHandler<UpdateInsuranceStatusCommand>
{
  async execute({
    id,
    status,
  }: UpdateInsuranceStatusCommand): Promise<UpdateInsuranceStatusCommandRes> {
    const res = await this.repo.updateStatus(id, status);
    return res;
  }
}
