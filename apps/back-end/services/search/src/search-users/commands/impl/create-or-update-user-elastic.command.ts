import { UserElasticModel } from '../../model';

export class CreateOrUpdateUserElasticCommand {
  constructor(public input: UserElasticModel) {}
}
