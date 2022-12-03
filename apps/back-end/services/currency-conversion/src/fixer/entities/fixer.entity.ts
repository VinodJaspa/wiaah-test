import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Fixer {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
