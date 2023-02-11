import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateMarketingTagInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
