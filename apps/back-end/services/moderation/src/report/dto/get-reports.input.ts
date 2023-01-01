import { Field, InputType } from '@nestjs/graphql';
import { ReportContentType } from 'prismaClient';

@InputType()
export class GetReportsInput {
  @Field(() => ReportContentType)
  contentType: ReportContentType;
}
