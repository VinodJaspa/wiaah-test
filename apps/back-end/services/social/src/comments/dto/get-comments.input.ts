import { Field, ID, InputType, Int } from '@nestjs/graphql';

@InputType()
export class GetContentCommentsInput {
  @Field(() => ID)
  id: string;

  @Field(() => String, { nullable: true })
  cursor?: string;

  @Field(() => Int, { nullable: true, defaultValue: 10 })
  take: number;
}
