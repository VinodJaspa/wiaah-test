import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class PinnedContent {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
