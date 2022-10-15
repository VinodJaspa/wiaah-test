import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ServiceExtra {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  cost: number;
}
