import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class RequiredAction {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
