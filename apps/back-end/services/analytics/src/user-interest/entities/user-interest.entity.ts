import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UserInterest {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
