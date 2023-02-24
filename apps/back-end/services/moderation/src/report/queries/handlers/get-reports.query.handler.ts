import { CommandHandler, IQueryHandler } from '@nestjs/cqrs';
import { ReportBaseHandler } from '@report/abstraction';
import { GetReportsQuery } from '@report/queries/impl';

@CommandHandler(GetReportsQuery)
export class GetReportsQueryHandler
  extends ReportBaseHandler
  implements IQueryHandler<GetReportsQuery>
{
  async execute({ input: { type } }: GetReportsQuery): Promise<any> {
    const res = await this.repo.getAllByType(type);

    return res;
  }
}
