import { ClassType } from 'nest-utils';

export function BaseElasticDoucment<TBase extends ClassType>(
  superClass: TBase,
) {
  return class extends superClass {
    dbId: string;
  };
}
