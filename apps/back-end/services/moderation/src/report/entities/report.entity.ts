import { ObjectType, Field, Int, ID, registerEnumType } from '@nestjs/graphql';
import { ReportStatus, ReportType } from 'prismaClient';

registerEnumType(ReportStatus, { name: 'ReportStatus' });

@ObjectType()
export class Report {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  reportedById: string;

  @Field(() => String)
  contentId: string;

  @Field(() => String)
  message: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => ReportStatus)
  status: ReportStatus;

  @Field(() => ReportType)
  type: ReportType;

  @Field(() => Date)
  updatedAt: Date;
}
