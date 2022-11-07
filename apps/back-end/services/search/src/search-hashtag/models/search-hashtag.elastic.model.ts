import { BaseElasticDoucment } from 'nest-utils';

export class SearchHashtagElasticModel extends BaseElasticDoucment(
  class {
    name: string;
  },
) {}
