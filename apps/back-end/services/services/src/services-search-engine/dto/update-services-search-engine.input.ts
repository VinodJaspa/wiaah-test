import { CreateServicesSearchEngineInput } from './create-services-search-engine.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateServicesSearchEngineInput extends PartialType(CreateServicesSearchEngineInput) {
  @Field(() => Int)
  id: number;
}
