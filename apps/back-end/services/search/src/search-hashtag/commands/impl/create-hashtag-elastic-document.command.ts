import { SearchHashtagElasticModel } from '../../models';

export class CreateHashtagElasticDocumentCommand {
  constructor(public doc: SearchHashtagElasticModel) {}
}
