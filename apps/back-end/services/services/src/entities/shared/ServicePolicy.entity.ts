import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ServicePolicy {
  @Field(() => String)
  policyTitle: string;

  @Field(() => [String])
  terms: string[];
}
