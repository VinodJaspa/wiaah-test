import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { HashtagStatus } from '@prisma-client';
import { GqlPaginationInput } from 'nest-utils';

@InputType()
class input {
  @Field(() => String)
  tag: string;

  @Field(() => Int)
  usage: number;

  @Field(() => HashtagStatus)
  status: HashtagStatus;

  @Field(() => String)
  createdAt: Date;
}

@InputType()
export class GetFilteredHashtagsInput extends PartialType(input) {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}
