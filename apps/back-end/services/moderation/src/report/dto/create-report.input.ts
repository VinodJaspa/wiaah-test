import { InputType, Int, Field, ID, registerEnumType } from '@nestjs/graphql';
import { ReportContentType } from 'prismaClient';

registerEnumType(ReportContentType, { name: 'ReportContentType' });

@InputType()
export class CreateReportInput {
  @Field(() => ID)
  contentId: string;

  @Field(() => ID)
  reportedBy: string;

  @Field(() => ReportContentType)
  contentType: ReportContentType;

  @Field(() => String)
  message: string;
}
