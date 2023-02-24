import { InputType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { ReportType } from 'prismaClient';

registerEnumType(ReportType, { name: 'ReportType' });

@InputType()
export class CreateReportInput {
  @Field(() => ID)
  contentId: string;

  @Field(() => String)
  message: string;

  @Field(() => ReportType)
  type: ReportType;
}
