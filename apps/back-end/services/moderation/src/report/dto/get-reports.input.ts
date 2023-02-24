import { Field, InputType, PartialType } from '@nestjs/graphql';
import { GqlPaginationInput } from 'nest-utils';
import { ReportType } from 'prismaClient';

@InputType()
export class input {
  @Field(() => ReportType)
  type: ReportType;

  @Field(() => String)
  id: string;
  @Field(() => String)
  reason: string;
  @Field(() => String)
  status: string;
  @Field(() => String)
  legend: string;
  @Field(() => String)
  views: string;

  @Field(() => String)
  likes: string;

  @Field(() => String)
  comments: string;

  @Field(() => String)
  shares: string;
  @Field(() => String)
  publishDate: string;
}

@InputType()
export class GetReportsInput extends PartialType(input) {
  @Field(() => GqlPaginationInput)
  pagination: GqlPaginationInput;
}
