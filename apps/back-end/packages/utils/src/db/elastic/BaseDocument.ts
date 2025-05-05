import { ClassType } from "../../types";

export function BaseElasticDoucment<TBase extends ClassType>(
  superClass: TBase
) {
  return class extends superClass {
    dbId: string = ''; 
  };
}
