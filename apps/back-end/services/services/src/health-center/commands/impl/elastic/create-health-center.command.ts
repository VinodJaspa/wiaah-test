import { HealthCenterElasticDocument } from '../../../models';

export class CreateElasticHealthCenterCommand {
  constructor(public readonly input: HealthCenterElasticDocument) {}
}
