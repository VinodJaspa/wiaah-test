import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UsersInteraction {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
