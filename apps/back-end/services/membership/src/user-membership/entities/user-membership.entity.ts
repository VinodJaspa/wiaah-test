import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UserMembership {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
