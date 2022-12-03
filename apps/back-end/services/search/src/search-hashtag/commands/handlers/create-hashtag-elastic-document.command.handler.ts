import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SearchHashtag } from '../../entities';
import { SearchHashtagElasticRepository } from '../../repository';
import { CreateHashtagElasticDocumentCommand } from '../impl';

@CommandHandler(CreateHashtagElasticDocumentCommand)
export class CreateHashtagElasticDocumentCommandHandler
  implements ICommandHandler<CreateHashtagElasticDocumentCommand>
{
  constructor(private readonly elasticRepo: SearchHashtagElasticRepository) {}
  async execute({ doc }: CreateHashtagElasticDocumentCommand): Promise<void> {
    await this.elasticRepo.indexHashtag(doc);
  }
}
