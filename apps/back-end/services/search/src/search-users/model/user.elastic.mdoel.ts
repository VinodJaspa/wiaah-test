import { BaseElasticDoucment } from 'nest-utils';

export class UserElasticModel extends BaseElasticDoucment(
  class {
    username: string;
    firstName: string;
    lastName: string;
  },
) {}
