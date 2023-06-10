import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Contactus {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
