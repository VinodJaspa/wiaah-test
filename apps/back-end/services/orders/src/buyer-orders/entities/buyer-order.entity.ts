import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class BuyerOrder {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
