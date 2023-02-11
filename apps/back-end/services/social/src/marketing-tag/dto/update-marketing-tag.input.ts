import { CreateMarketingTagInput } from './create-marketing-tag.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMarketingTagInput extends PartialType(CreateMarketingTagInput) {
  @Field(() => Int)
  id: number;
}
