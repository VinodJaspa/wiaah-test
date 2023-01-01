import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ContentSuspense {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
