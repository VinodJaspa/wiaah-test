import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UserActivityStats {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
