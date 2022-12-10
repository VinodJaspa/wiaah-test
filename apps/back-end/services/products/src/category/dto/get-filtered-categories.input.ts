import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class GetFilteredCategory {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => Int, { nullable: true })
  sortOrder?: number;
}
