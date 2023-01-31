import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Rest {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
