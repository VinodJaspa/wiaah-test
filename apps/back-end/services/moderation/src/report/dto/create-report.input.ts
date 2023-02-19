import { InputType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { ReportContentType, ReportType } from 'prismaClient';

registerEnumType(ReportContentType, { name: 'ReportContentType' });
registerEnumType(ReportType, { name: 'ReportType' });

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

  @Field(() => ReportType)
  type: ReportType;
}
